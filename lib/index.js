const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const mongoose = require('mongoose');
const {middlewares} = require('@bandwidth/node-bandwidth-extra');

async function main() {
	mongoose.Promise = global.Promise;
	await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost/appointment-reminder');

	const app = new Koa();
	const {BANDWIDTH_USER_ID, BANDWIDTH_API_TOKEN, BANDWIDTH_API_SECRET} = process.env;
	const bandwidthMiddleware = middlewares.koa({
		auth: {userId: BANDWIDTH_USER_ID, apiToken: BANDWIDTH_API_TOKEN, apiSecret: BANDWIDTH_API_SECRET}
	});
	app
		.use(koaBody())
		.use(bandwidthMiddleware)
		.use(koaStatic(path.join(__dirname, '..', 'public')));
	app.ws.use(bandwidthMiddleware);
	return app;
}

module.exports = main;
