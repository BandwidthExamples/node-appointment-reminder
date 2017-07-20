const test = require('ava');
const td = require('testdouble');

const Message = {send: td.function()};
const Call = {speakSentence: td.function(), hangup: td.function()};

td.replace('../lib/bandwidth', {Message, Call});
td.replace('../lib/prepare-time', () => new Date('2017-07020T11:01:00.000Z'));
const sendCode = td.function();
td.replace('../lib/verification-code-sender', sendCode);

class User {
	constructor(data = {}) {
		Object.keys(data).forEach(k => {
			this[k] = data[k];
		});
	}
	save() {
		return Promise.resolve();
	}
}

const Reminder = User;

User.getByPhoneNumber = td.function();

Reminder.find = td.function();
Reminder.update = td.function();
Reminder.remove = td.function();

td.replace('../lib/models', {User, Reminder});

td.when(User.getByPhoneNumber('+11345678900')).thenResolve(null);
td.when(User.getByPhoneNumber('+11345678901')).thenResolve(new User());
td.when(User.getByPhoneNumber('+11345678902')).thenResolve(new User({phoneNumber: '+11345678902'}));
td.when(User.getByPhoneNumber('+11345678903')).thenResolve(new User({phoneNumber: '+11345678903', verificationCode: '0000', save: () => Promise.resolve()}));

const routes = require('../lib/routes').routes();

test.beforeEach(t => {
	t.context = {
		request: {
			body: {}
		},
		session: {}
	};
});

test('POST /register should register new user', async t => {
	t.context.method = 'POST';
	t.context.path = '/register';
	t.context.request.body.fields = {name: 'test', phoneNumber: '+11345678900'};
	td.when(sendCode('+11345678900')).thenResolve();
	await routes(t.context, null);
	t.is(t.context.body, '');
});

test('POST /register should fail for existing user', async t => {
	t.context.method = 'POST';
	t.context.path = '/register';
	t.context.request.body.fields = {name: 'test', phoneNumber: '+11345678901'};
	await routes(t.context, null);
	t.truthy(t.context.body.error);
});

test('POST /login should login with existing user', async t => {
	t.context.method = 'POST';
	t.context.path = '/login';
	t.context.request.body.fields = {phoneNumber: '+11345678902'};
	td.when(sendCode('+11345678902')).thenResolve();
	await routes(t.context, null);
	t.is(t.context.body, '');
});

test('POST /login should fail for non-existing user', async t => {
	t.context.method = 'POST';
	t.context.path = '/login';
	t.context.request.body.fields = {phoneNumber: '+11345678900'};
	await routes(t.context, null);
	t.truthy(t.context.body.error);
});

test('POST /verify-code should login with existing user', async t => {
	t.context.method = 'POST';
	t.context.path = '/verify-code';
	t.context.request.body.fields = {phoneNumber: '+11345678903', code: '0000'};
	await routes(t.context, null);
	t.is(t.context.session.userPhoneNumber, '+11345678903');
	t.falsy(t.context.body.verificationCode);
});

test('POST /verify-code should fail for non-existing user', async t => {
	t.context.method = 'POST';
	t.context.path = '/verify-code';
	t.context.request.body.fields = {phoneNumber: '+11345678900', code: '0000'};
	await routes(t.context, null);
	t.truthy(t.context.body.error);
});

test('POST /verify-code should fail fo invalid code', async t => {
	t.context.method = 'POST';
	t.context.path = '/verify-code';
	t.context.request.body.fields = {phoneNumber: '+11345678903', code: '0001'};
	await routes(t.context, null);
	t.truthy(t.context.body.error);
});

test('POST /logout should remove user data from session', async t => {
	t.context.method = 'POST';
	t.context.path = '/logout';
	t.context.session.userPhoneNumber = '+11345678903';
	await routes(t.context, null);
	t.falsy(t.context.session.userPhoneNumber);
});

test('POST /bandwidth/call-callback should handle answer', async t => {
	t.context.method = 'POST';
	t.context.path = '/bandwidth/call-callback';
	t.context.request.body = {
		eventType: 'answer',
		callId: 'callId',
		tag: 'Hello'
	};
	td.when(Call.speakSentence('callId', 'Hello')).thenResolve();
	await routes(t.context, null);
	t.pass();
});

test('POST /bandwidth/call-callback should handle speak', async t => {
	t.context.method = 'POST';
	t.context.path = '/bandwidth/call-callback';
	t.context.request.body = {
		eventType: 'speak',
		callId: 'callId',
		status: 'done'
	};
	td.when(Call.hangup('callId')).thenResolve();
	await routes(t.context, null);
	t.pass();
});

test('POST /bandwidth/call-callback should do nothing for other events', async t => {
	t.context.method = 'POST';
	t.context.path = '/bandwidth/call-callback';
	t.context.request.body = {
		eventType: 'test'
	};
	await routes(t.context, null);
	t.pass();
});

test('GET /reminder should return reminders', async t => {
	t.context.method = 'GET';
	t.context.path = '/reminder';
	t.context.user = {};
	td.when(Reminder.find({user: t.context.user})).thenReturn({sort: () => Promise.resolve([{}])});
	await routes(t.context, null);
	t.is(t.context.body.length, 1);
});

test('POST /reminder should create a reminder', async t => {
	t.context.method = 'POST';
	t.context.path = '/reminder';
	t.context.user = {};
	const time = new Date();
	t.context.request.body.fields = {
		name: 'test',
		content: 'Hello',
		time,
		notificationType: 'Sms'
	};
	await routes(t.context, null);
	t.truthy(t.context.body);
});

test('POST /reminder/:id/enabled should enable/disable a reminder', async t => {
	t.context.method = 'POST';
	t.context.path = '/reminder/id/enabled';
	t.context.user = {id: 'userId'};
	t.context.request.body.fields = {
		enabled: 'false'
	};
	td.when(Reminder.update({_id: 'id', user: 'userId'}, {$set: {enabled: false}})).thenResolve();
	await routes(t.context, null);
	t.is(t.context.body, '');
});

test('DELETE /reminder/:id should remove a reminder', async t => {
	t.context.method = 'DELETE';
	t.context.path = '/reminder/id';
	t.context.user = {id: 'userId'};
	td.when(Reminder.remove({_id: 'id', user: 'userId'})).thenResolve();
	await routes(t.context, null);
	t.is(t.context.body, '');
});

test('DELETE /reminder/:id should return 401 on non-authed call', async t => {
	t.context.method = 'DELETE';
	t.context.path = '/reminder/id';
	t.context.throw = td.function();
	td.when(t.context.throw(401)).thenThrow(new Error('401'));
	await t.throws(routes(t.context, null));
});
