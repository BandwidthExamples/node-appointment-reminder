const mongoose = require('mongoose');

module.exports = () => mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost/appointment-reminder');
