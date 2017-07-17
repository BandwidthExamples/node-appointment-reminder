const moment = require('moment');
const debug = require('debug')('reminder-scheduler');
const database = require('./database');
const {Reminder} = require('./models');
const {getHostData} = require('./host');
const prepareTime = require('./prepare-time');
const bandwidthApi = require('./bandwidth');
const getServicePhoneNumber = require('./service-phone-number');

function add(reminder, interval, units) {
	reminder.time = moment(reminder.time).add(interval, units).toDate();
}

async function sendScheduledNotifications() {
	const now = prepareTime(moment());
	const reminders = await Reminder.find({$lte: {time: now}, enabled: true, completed: false}).populate('user');
	debug(`Sending scheduled notifications for ${reminders.length} reminders`);
	await Promise.all(reminders.map(async r => {
		switch (r.notificationType) {
			case 'sms':
				debug(`Sending SMS for reminder ${r.name} (${r.id})`);
				await bandwidthApi.Message.send({
					from: await getServicePhoneNumber(),
					to: r.user.phoneNumber,
					text: r.content
				});
				break;
			case 'call': {
				debug(`Making call for reminder ${r.name} (${r.id})`);
				const host = await getHostData();
				if (!host) {
					throw new Error('Missing host information. Please open any page of this app first.');
				}
				await bandwidthApi.Call.create({
					from: await getServicePhoneNumber(),
					to: r.user.phoneNumber,
					callbackUrl: `${host.protocol}://${host.host}/bandwidth/call-callback`,
					tag: r.content
				});
				break;
			}
			default:
				debug(`Unknown notification type ${r.notificationType}`);
		}
		switch (r.repeat) {
			case 'once':
				debug(`Completing one time reminder ${r.name} (${r.id})`);
				r.completed = true;
				break;
			case 'daily':
				debug(`Sheduling new time for reminder ${r.name} (${r.id}) (1 day)`);
				add(r, 1, 'd');
				break;
			case 'weekly':
				debug(`Sheduling new time for reminder ${r.name} (${r.id}) (7 days)`);
				add(r, 7, 'd');
				break;
			case 'monthly':
				debug(`Sheduling new time for reminder ${r.name} (${r.id}) (1 month)`);
				add(r, 1, 'm');
				break;
			default:
				debug(`Unknown repeat type ${r.repeat}`);
				break;
		}
		await r.save();
	}));
}

async function main() {
	await database();
	const iteration = () => sendScheduledNotifications().catch(err => console.error(err.stack));
	setInterval(iteration, 60000);
	iteration();
}

module.exports = main;
