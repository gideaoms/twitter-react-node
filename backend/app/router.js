const Router = require('koa-router');
const {
  reverse, token, tweets, add,
} = require('./controllers/twitter');

const router = new Router();

router.post('/twitter/reverse', reverse);

router.post('/twitter/token', token);

router.get('/twitter/tweets', tweets);

router.post('/twitter/add', add);

module.exports = router;
