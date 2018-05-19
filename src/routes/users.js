const jwt = require('jsonwebtoken'); // auth via JWT for http
const shortid = require('shortid');

module.exports = (router, { db, jwtsecret, passport }, { checkAuth }) => {
  router.post('/user', async(ctx, next) => {
    try {
      const user = ctx.request.body.email && db.get('users')
        .find({ email: ctx.request.body.email })
        .value();

      ctx.assert(!user, 400, 'Email already registered!');

      const id = shortid.generate();
      db.get('users')
        .push({
          id,
          ...ctx.request.body,
        })
        .write();
      ctx.body = id;
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
  });

  // local auth route. Creates JWT is successful

  router.post('/login', async(ctx, next) => {
    await passport.authenticate('local', function (err, user) {
      if (user == false) {
        ctx.body = "Login failed";
      } else {
        const payload = {
          id: user.id,
          displayName: user.displayName,
          email: user.email
        };
        const token = jwt.sign(payload, jwtsecret); //JWT is created here

        ctx.body = {user: user.displayName, token: token};
      }
    })(ctx, next);

  });
};
