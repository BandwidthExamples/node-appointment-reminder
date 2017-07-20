const test = require('ava');
const td = require('testdouble');

const Message = {send: td.function()};
const Call = {create: td.function()};

td.replace('../lib/bandwidth', {Message, Call});
td.replace('../lib/service-phone-number', () => Promise.resolve('+12345678900'));
td.replace('../lib/prepare-time', () => new Date('2017-07020T11:01:00.000Z'));
td.replace('../lib/host', {getHostData: () => Promise.resolve({host: 'host', protocol: 'http'})});

const Reminder = {
	find: td.function()
};

td.replace('../lib/models', {Reminder});

const user = {phoneNumber: '+12345678901'};

function getReminder(data) {
	data.save = td.function();
	td.when(data.save()).thenResolve();
	data.user = user;
	return data;
}

const reminders = [
	getReminder({id: '1', name: 'reminder1', notificationType: 'Sms', content: 'Hello1', repeat: 'Once', time: new Date('2017-07-19T10:01:00Z')}),
	getReminder({id: '2', name: 'reminder2', notificationType: 'Call', content: 'Hello2', repeat: 'Daily', time: new Date('2017-07-19T11:01:00Z')}),
	getReminder({id: '3', name: 'reminder3', notificationType: 'Call', content: 'Hello3', repeat: 'Weekly', time: new Date('2017-07-19T12:01:00Z')}),
	getReminder({id: '4', name: 'reminder4', notificationType: 'Call', content: 'Hello4', repeat: 'Monthly', time: new Date('2017-07-19T13:01:00Z')})
];
td.when(Reminder.find({time: {$lte: new Date('2017-07020T11:01:00.000Z')}, enabled: true, completed: false})).thenReturn({populate: () => Promise.resolve(reminders)});

td.when(Message.send({from: '+12345678900', to: '+12345678901', text: 'Hello1'}));
td.when(Call.create({from: '+12345678900', to: '+12345678901', tag: 'Hello2', callbackUrl: 'http://host/bandwidth/call-callback'}));
td.when(Call.create({from: '+12345678900', to: '+12345678901', tag: 'Hello3', callbackUrl: 'http://host/bandwidth/call-callback'}));
td.when(Call.create({from: '+12345678900', to: '+12345678901', tag: 'Hello4', callbackUrl: 'http://host/bandwidth/call-callback'}));

const {sendScheduledNotifications} = require('../lib/reminder-scheduler');

test('should return service phone number', async t => {
	await sendScheduledNotifications();
	t.is(reminders[0].time.toISOString(), '2017-07-19T10:01:00.000Z');
	t.true(reminders[0].completed);
	t.is(reminders[1].time.toISOString(), '2017-07-20T11:01:00.000Z');
	t.falsy(reminders[1].completed);
	t.is(reminders[2].time.toISOString(), '2017-07-26T12:01:00.000Z');
	t.falsy(reminders[2].completed);
	t.is(reminders[3].time.toISOString(), '2017-08-19T13:01:00.000Z');
	t.falsy(reminders[3].completed);
});
