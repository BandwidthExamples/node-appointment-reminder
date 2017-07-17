const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost/appointment-reminder', {useMongoClient: true});
