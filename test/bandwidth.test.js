const test = require('ava');

test.serial('should fail if auth data is missing', t => {
	t.throws(() => require('../lib/bandwidth'));
});

test.serial('should return bandwidth api instance', t => {
	process.env = {BANDWIDTH_USER_ID: 'userId', BANDWIDTH_API_TOKEN: 'token', BANDWIDTH_API_SECRET: 'secret'};
	const api = require('../lib/bandwidth');
	t.truthy(api);
});
