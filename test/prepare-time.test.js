const test = require('ava');
const prepare = require('../lib/prepare-time');

test('should remove seconds part', t => {
	const time = prepare('2017-07-20T09:01:42.712Z').toISOString();
	t.is(time, '2017-07-20T09:01:00.000Z');
});
