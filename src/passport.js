const passport = require('koa-passport'); //passport for Koa
const LocalStrategy = require('passport-local'); //local Auth Strategy
const JwtStrategy = require('passport-jwt').Strategy; // Auth via JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // Auth via JWT
const jwt = require('jsonwebtoken'); // auth via JWT for hhtp


module.exports = (db, jwtsecret) => {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    const user = db.get('users')
                  .find({ email })
                  .value();
      // console.log('user local', user);
      if (!user || user.password !== password) {
        return done(null, false, {message: 'User does not exist or wrong password.'});
      }
      return done(null, user);
  }));

  //----------Passport JWT Strategy--------//

  // Expect JWT in the http header

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
  };

  passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    const user = db.get('users')
      .find({ id: payload.id }).value();

      // console.log('jwt strategy', user);

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }

  })
  );

  return passport;
};