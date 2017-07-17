const moment = require('moment');

module.exports = time => {
	const m = moment(time);
	const prepared = m.subtract(m.seconds(), 's').subtract(m.milliseconds(), 'ms');
	return prepared.toDate();
};
