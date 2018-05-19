const middlewares = require('../middlewares');
const users = require('./users');
const goals = require('./goals');

module.exports = (router, container) => {
  [users, goals].forEach(routes => routes(router, container, middlewares(container)));
}