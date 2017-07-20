const test = require('ava');
const td = require('testdouble');

const bandwidthApi = {};
td.replace('../lib/bandwidth', bandwidthApi);

const {phoneNumber} = require('@bandwidth/node-bandwidth-extra');

td.replace(phoneNumber, 'getOrCreatePhoneNumber');

td.when(phoneNumber.getOrCreatePhoneNumber(td.matchers.anything(), undefined, {name: 'reminderServiceNumber', areaCode: '910'})).thenResolve('+12345678901');

const getNumber = require('../lib/service-phone-number');

test('should return service phone number', async t => {
	const number = await getNumber();
	t.is(number, '+12345678901');
});
