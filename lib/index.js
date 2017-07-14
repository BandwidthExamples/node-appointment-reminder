const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const koaSession = require('koa-session');
const Bandwidth = require('node-bandwidth');

const database = require('./database');
const router = require('./routes');
const {User} = require('./models');

async function main() {
	await database();

	const app = new Koa();
	const {BANDWIDTH_USER_ID, BANDWIDTH_API_TOKEN, BANDWIDTH_API_SECRET} = process.env;
	app.keys = (process.env.COOKIES_KEYS || '1RdPzkxja8xONXAB').split(';');
	app.proxy = true;
	app
		.use(koaBody())
		.use(koaSession(app))
		.use(async (ctx, next) => {
			ctx.bandwidthApi = new Bandwidth({userId: BANDWIDTH_USER_ID, apiToken: BANDWIDTH_API_TOKEN, apiSecret: BANDWIDTH_API_SECRET});
			if (ctx.session.userPhoneNumber) {
				ctx.user = await User.getByPhoneNumber(ctx.session.userPhoneNumber);
			}
			await next();
		})
		.use(router.routes())
		.use(router.allowedMethods())
		.use(koaStatic(path.join(__dirname, '..', 'public')));
	return app;
}

module.exports = main;
