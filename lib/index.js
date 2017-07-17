const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const koaSession = require('koa-session');

const database = require('./database');
const router = require('./routes');
const {User} = require('./models');
const host = require('./host');

async function main() {
	await database();

	const app = new Koa();
	app.keys = (process.env.COOKIES_KEYS || '1RdPzkxja8xONXAB').split(';');
	app.proxy = true;
	app
		.use(host)
		.use(koaBody())
		.use(koaSession(app))
		.use(async (ctx, next) => {
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
