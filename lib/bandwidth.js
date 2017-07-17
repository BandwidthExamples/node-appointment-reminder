const Bandwidth = require('node-bandwidth');

const {BANDWIDTH_USER_ID, BANDWIDTH_API_TOKEN, BANDWIDTH_API_SECRET} = process.env;
module.exports = new Bandwidth({userId: BANDWIDTH_USER_ID, apiToken: BANDWIDTH_API_TOKEN, apiSecret: BANDWIDTH_API_SECRET});
