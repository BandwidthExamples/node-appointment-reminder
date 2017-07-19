const Router = require('koa-router');
const debug = require('debug')('routes');
const {User, Reminder} = require('./models');
const sendVerificationCode = require('./verification-code-sender');
const prepareTime = require('./prepare-time');
const bandwidthApi = require('./bandwidth');

const router = new Router();

async function error(ctx, next) {
	try {
		await next();
	} catch (err) {
		debug(err.stack);
		ctx.body = {error: err.message};
	}
}

router.post('/register', error, async ctx => {
	const data = ctx.request.body.fields;
	let user = await User.getByPhoneNumber(data.phoneNumber);
	if (user) {
		throw new Error('User with this number is registered already');
	}
	user = new User(data);
	await user.save();
	await sendVerificationCode(user.phoneNumber);
	ctx.body = '';
});

router.post('/login', error, async ctx => {
	const data = ctx.request.body.fields;
	const user = await User.getByPhoneNumber(data.phoneNumber);
	if (!user) {
		throw new Error('User with this number is not registered yet');
	}
	await sendVerificationCode(user.phoneNumber);
	ctx.body = '';
});

router.post('/verify-code', error, async ctx => {
	const data = ctx.request.body.fields;
	const user = await User.getByPhoneNumber(data.phoneNumber);
	if (!user) {
		throw new Error('User with this number is not registered yet');
	}
	if ((user.verificationCode !== data.code) || !data.code) {
		throw new Error('Invalid verification code');
	}
	user.verificationCode = null;
	await user.save();
	ctx.session.userPhoneNumber = user.phoneNumber;
	ctx.body = user;
});

router.post('/logout', error, async ctx => {
	delete ctx.session.userPhoneNumber;
	ctx.body = '';
});

router.post('/bandwidth/call-callback', async ctx => {
	const {eventType, callId, tag, status} = ctx.request.body;
	ctx.body = '';
	switch (eventType) {
		case 'answer': {
			await bandwidthApi.Call.speakSentence(callId, tag);
			break;
		}
		case 'speak': {
			if (status === 'done') {
				await bandwidthApi.Call.hangup(callId);
			}
			break;
		}
		default: {
			debug(`Unhandled event ${eventType}`);
		}
	}
});

function authentificated(ctx, next) {
	if (ctx.user) {
		return next();
	}
	ctx.throw(401);
}

router.get('/reminder', authentificated, error, async ctx => {
	ctx.body = await Reminder.find({user: ctx.user}).sort({createdAt: -1});
});

router.post('/reminder', authentificated, error, async ctx => {
	const data = ctx.request.body.fields;
	const reminder = new Reminder(data);
	reminder.time = prepareTime(data.time);
	reminder.user = ctx.user;
	await reminder.save();
	ctx.body = reminder;
});

router.post('/reminder/:id/enabled', authentificated, error, async ctx => {
	const {enabled} = ctx.request.body.fields;
	await Reminder.update({_id: ctx.params.id, user: ctx.user.id}, {$set: {enabled: enabled === 'true'}});
	ctx.body = '';
});

router.delete('/reminder/:id', authentificated, error, async ctx => {
	await Reminder.remove({_id: ctx.params.id, user: ctx.user.id});
	ctx.body = '';
});

module.exports = router;
