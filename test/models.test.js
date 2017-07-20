const test = require('ava');
const td = require('testdouble');
const models = require('../lib/models');

td.replace(models.User, 'findOne');
td.when(models.User.findOne({phoneNumber: '+12345687900'})).thenResolve(new models.User());

test('User.getByPhoneNumber() should return user by number (full number)', async t => {
	const user = await models.User.getByPhoneNumber('+12345687900');
	t.truthy(user);
});

test('User.getByPhoneNumber() should return user by number (without plus)', async t => {
	const user = await models.User.getByPhoneNumber('12345687900');
	t.truthy(user);
});

test('User.getByPhoneNumber() should return user by number (without country code)', async t => {
	const user = await models.User.getByPhoneNumber('2345687900');
	t.truthy(user);
});

test('Reminder.toJSON() should return formatted json', t => {
	const reminder = new models.Reminder();
	reminder.user = new models.User();
	const json = reminder.toJSON();
	t.truthy(json.id);
	t.truthy(json.userId);
});
