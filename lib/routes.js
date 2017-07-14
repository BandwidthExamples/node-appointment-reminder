const Router = require('koa-router');

const router = new Router();

router.post('/register', async ctx => {});

router.post('/login', async ctx => {});

router.post('/verify-code', async ctx => {});

router.post('/logout', async ctx => {});

router.post('/call-callback', async ctx => {});

router.get('/reminder', async ctx => {});

router.post('/reminder', async ctx => {});

router.post('/reminder/:id/enabled', async ctx => {});

router.delete('/reminder/:id', async ctx => {});

module.exports = router;
