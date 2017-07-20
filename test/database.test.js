const mongoose = require('mongoose');
const test = require('ava');
const td = require('testdouble');

td.replace(mongoose, 'connect');

td.when(mongoose.connect(td.matchers.anything())).thenResolve();

const database = require('../lib/database');

test.serial('should connect to mongo db', async t => {
	await database();
	t.pass();
});
