const mongoose = require('mongoose');

let User = null;

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true, index: true},
	phoneNumber: {type: String, required: true, index: true},
	verificationCode: {type: String}
});

UserSchema.statics.getByPhoneNumber = number => {
	number = number.replace(/([\s()-])/g, '');
	if (number.length === 10) {
		number = `+1${number}`;
	}
	if (number[0] !== '+') {
		number = `+${number}`;
	}
	return User.findOne({phoneNumber: number});
};

User = mongoose.model('User', UserSchema);

const ReminderSchema = new mongoose.Schema({
	name: {type: String, required: true, index: true},
	content: {type: String, required: true},
	createdAt: {type: Date, required: true, index: true, default: Date.now},
	time: {type: Date, required: true},
	notificationType: {type: String, required: true, enum: ['Sms', 'Call']},
	repeat: {type: String, required: true, enum: ['Once', 'Daily', 'Weekly', 'Monthly'], default: 'Once'},
	enabled: {type: Boolean, required: true, index: true, default: true},
	completed: {type: Boolean, required: true, index: true, default: false},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true}
});

if (!ReminderSchema.options.toJSON) {
	ReminderSchema.options.toJSON = {};
}

ReminderSchema.options.toJSON.transform = (doc, ret) => {
	ret.id = ret._id.toString();
	delete ret._id;
	ret.userId = (ret.user.id || ret.user).toString();
	return ret;
};

const HostDataSchema = new mongoose.Schema({
	host: {type: String, required: true},
	protocol: {type: String, required: true}
});

module.exports = {
	User,
	Reminder: mongoose.model('Reminder', ReminderSchema),
	HostData: mongoose.model('HostData', HostDataSchema)
};
