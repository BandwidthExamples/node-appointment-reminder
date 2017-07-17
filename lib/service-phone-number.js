const {phoneNumber} = require('@bandwidth/node-bandwidth-extra');
const bandwidthApi = require('./bandwidth');

let serviceNumber = null;

module.exports = async () => {
	if (!serviceNumber) {
		serviceNumber = await phoneNumber.getOrCreatePhoneNumber(
			bandwidthApi,
			undefined,
			{name: 'reminderServiceNumber', areaCode: process.env.SERVICE_NUMBER_AREA_CODE || '910'});
	}
	return serviceNumber;
};
