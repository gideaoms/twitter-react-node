const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./app/router');

const port = process.env.PORT || 3020;
const server = new Koa();

server.use(cors());
server.use(bodyParser());
server.use(router.routes());

module.exports = server.listen(port, () => global.console.info(`Api listening on port ${port}`));
