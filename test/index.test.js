const test = require('ava');
const td = require('testdouble');
const supertest = require('supertest');

const database = td.replace('../lib/database');
const host = td.replace('../lib/host');

const router = {routes: td.function(), allowedMethods: td.function()};
td.replace('../lib/routes', router);
const models = {User: {getByPhoneNumber: td.function()}};
td.replace('../lib/models', models);
const main = require('../lib/index');

td.when(database()).thenResolve();
td.when(router.allowedMethods()).thenReturn((ctx, next) => next());
let user = null;
td.when(router.routes()).thenReturn((ctx, next) => {
	user = ctx.user;
	return next();
});
td.when(host(td.matchers.anything(), td.matchers.anything())).thenDo((ctx, next) => {
	ctx.session.userPhoneNumber = '+1234567890';
	return next();
});
td.when(models.User.getByPhoneNumber('+1234567890')).thenResolve({});

/*test('GET / should render index page', async t => {
	const app = await main();
	user = null;
	await supertest(app.callback()).get('/')
		.expect(200);
	t.pass();
	t.truthy(user);
});*/
