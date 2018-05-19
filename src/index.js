const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');


const db = require('./db');
const jwtsecret = "mysecretkey"; //JWT SECRET
const passport = require('./passport')(db, jwtsecret);
const setRoutes = require('./routes');

const app = new Koa();
const router = new Router();

setRoutes(router, { db, jwtsecret, passport });

app.use(serve('public'));
app.use(logger());
app.use(bodyParser());

app.use(passport.initialize());
app.use(router.routes());

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
