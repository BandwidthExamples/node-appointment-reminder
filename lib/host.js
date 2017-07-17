const debug = require('debug')('host');
const {HostData} = require('./models');

async function updateHostData(ctx) {
	const host = (await HostData.findOne({})) || new HostData();
	host.host = ctx.host;
	host.protocol = ctx.protocol;
	await host.save();
}

module.exports = (ctx, next) => {
	updateHostData(ctx).catch(debug);
	return next();
};

module.exports.getHostData = () => {
	return HostData.findOne({});
};
