const debug = require('debug')('verification-code-sender');
const bandwidthApi = require('./bandwidth');
const {User} = require('./models');
const getServicePhoneNumber = require('./service-phone-number');

module.exports = async number => {
	const user = await User.getByPhoneNumber(number);
	if (!user) {
		return;
	}
	const code = ((Math.random() * 8999) + 1000).toString();
	debug(`Sending verification code ${code} to ${user.phoneNumber}`);
	await bandwidthApi.Message.send({
		from: await getServicePhoneNumber(),
		to: user.phoneNumber,
		text: `Your verification code: ${code}`
	});
	user.verificationCode = code;
	await user.save();
	return user;
};
