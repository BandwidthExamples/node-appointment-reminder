const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true, index: true},
	phoneNumber: {type: String, required: true, index: true},
	verificationCode: {type: String}
});

const ReminderSchema = new mongoose.Schema({
	name: {type: String, required: true, index: true},
	content: {type: String, required: true},
	createdAt: {type: Date, required: true, index: true, default: Date.now},
	time: {type: Date, required: true},
	phoneNumber: {type: String, required: true, index: true},
	notificationType: {type: String, required: true, enum: ['sms', 'call']},
	repeat: {type: String, required: true, enum: ['once', 'daily', 'weekly', 'monthly'], default: 'once'},
	enabled: {type: Boolean, required: true, index: true, default: true},
	completed: {type: Boolean, required: true, index: true, default: true},
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

module.exports = {
	User: mongoose.model('User', UserSchema),
	Reminder: mongoose.model('Reminder', ReminderSchema)
};
