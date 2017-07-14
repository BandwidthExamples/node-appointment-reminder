const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const {middlewares} = require('@bandwidth/node-bandwidth-extra');

const database = require('./database');
const router = require('./routes');

async function main() {
	await database();

	const app = new Koa();
	const {BANDWIDTH_USER_ID, BANDWIDTH_API_TOKEN, BANDWIDTH_API_SECRET} = process.env;
	app.keys = (process.env.COOKIES_KEYS || '1RdPzkxja8xONXAB').split(';');
	app.proxy = true;
	app
		.use(koaBody())
		.use(middlewares.koa({
			auth: {userId: BANDWIDTH_USER_ID, apiToken: BANDWIDTH_API_TOKEN, apiSecret: BANDWIDTH_API_SECRET}
		}))
		.use(router.routes())
		.use(router.allowedMethods())
		.use(koaStatic(path.join(__dirname, '..', 'public')));
	return app;
}

module.exports = main;
