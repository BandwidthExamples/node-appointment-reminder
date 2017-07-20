const test = require('ava');
const td = require('testdouble');

const bandwidthApi = {
	Message: {
		send: td.function()
	}
};
td.replace('../lib/bandwidth', bandwidthApi);

td.replace('../lib/service-phone-number', () => Promise.resolve('+12345678900'));

const User = {
	getByPhoneNumber: td.function()
};

td.replace('../lib/models', {User});

td.when(User.getByPhoneNumber('+12345678901')).thenResolve({phoneNumber: '+12345678901', save: () => Promise.resolve()});

td.replace(Math, 'random');

td.when(Math.random()).thenReturn(0);

td.when(bandwidthApi.Message.send({from: '+12345678900', to: '+12345678901', text: 'Your verification code: 1000'})).thenResolve();

const verificationCodeSender = require('../lib/verification-code-sender');

test('should return service phone number', async t => {
	const user = await verificationCodeSender('+12345678901');
	t.is(user.verificationCode, '1000');
});
