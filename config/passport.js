var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , User = require('../src/models/user')
  , config = require('./config')

module.exports = function(app) {

  // Passport serialisation
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(obj, done) {
    User.findById(obj).then(done.bind(null, null)); // This way the found user obj is 2nd param
  });

  // Setup facebook strategy
  var strategy_config = {
    clientID: config.facebook.ID,
    clientSecret: config.facebook.secret,
    callbackURL: "http://" + config.host + "/auth/facebook/callback",
    profileFields: ['id', 'email', 'first_name', 'last_name'],
    enableProof: false
  }

  var strategy_callback = (accessToken, refreshToken, profile, done) => {
    var userData = {
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0] ? profile.emails[0].value : undefined,
      provider: 'facebook',
      fb_data: {
        id: profile.id,
        accessToken: accessToken
      }
    };

    User.findOrCreateByFacebookId(profile.id, userData)
    .then((user) => done(null, user), done)
  }

  // Setup passport within app
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new FacebookStrategy(strategy_config, strategy_callback));
}
