const test = require('ava');
const td = require('testdouble');

const models = {HostData: {findOne: td.function()}};
td.replace('../lib/models', models);

const host = require('../lib/host');

const mockHost = {save: td.function()};
td.when(models.HostData.findOne({})).thenResolve(mockHost);
td.when(mockHost.save()).thenResolve();

test.cb('should save host data', t => {
	host({
		host: 'host',
		protocol: 'https'
	}, t.end);
});

test('should provide host data', async t => {
	const data = await host.getHostData();
	t.truthy(data);
});
