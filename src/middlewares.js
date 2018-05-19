module.exports = ({ passport, db }) => ({
  checkAuth: async(ctx, next) => {
    await passport.authenticate('jwt', function (err, user) {
      if (user) {
        ctx.user = user;
        // ctx.body = "hello " + user.displayName;
      } else {
        ctx.body = 'Unauthorized';
        console.log('err', err);
      }
    })(ctx, next);
    ctx.assert(ctx.user, 401);
    await next();
  },

})