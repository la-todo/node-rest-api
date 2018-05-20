const shortid = require('shortid');

module.exports = (router, { db }, { checkAuth }) => {

  router.post('/goals', checkAuth, async(ctx) => {
    // console.log('ctx user some', ctx.user);
    try {
      const id = shortid.generate();
      db.get('goals')
          .push({
            id,
            userId: ctx.user.id,
            ...ctx.request.body,
          })
          .write();
      ctx.body = { id };
      } catch(err) {
        ctx.throw(500, err.message);
      }
  });


  router.get('/goals', checkAuth, async(ctx) => {
    try {
      ctx.body = {
        goals: db.get('goals')
          .filter({ userId: ctx.user.id })
          .value()
      };
    } catch(err) {
      ctx.throw(500, err.message);
    }
  });

  router.get('/goals/:id', checkAuth, async(ctx) => {
    console.log(ctx.params);
    try {
      ctx.body = db.get('goals')
        .find({ userId: ctx.user.id, id: ctx.params.id })
        .value();
      } catch(err) {
        ctx.throw(500, err.message);
      }
  });

  router.post('/goals/:id', checkAuth, async(ctx) => {
    console.log(ctx.params);
    try {
      ctx.body = db.get('goals')
        .find({ userId: ctx.user.id, id: ctx.params.id })
        .assign(ctx.request.body)
        .write();
      } catch(err) {
        ctx.throw(500, err.message);
      }
  });

  router.delete('/goals/:id', checkAuth, async(ctx) => {
    try {
      db.get('goals')
        .remove({ userId: ctx.user.id, id: ctx.params.id })
        .write();
      ctx.body = { id: ctx.params.id };
      } catch(err) {
        ctx.throw(500, err.message);
      }
  });
};
