const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
	return new Promise((resolve, reject) => {
		const connection = mongoose.createConnection();
		connection.on('open', resolve);
		connection.on('error', reject);
		connection.openUri(process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost/appointment-reminder');
	});
};
