(function() {

  "use strict";

  // Controllers
  var users_controller = require('../src/controllers/users_controller')
    , user_sessions_controller = require('../src/controllers/user_sessions_controller')
    , media_controller = require('../src/controllers/media_controller')
    , payments_controller = require('../src/controllers/payments_controller')

  var paywall = require('../src/middlewares/paywall');

  // Middlewares
  var requireLogin = require('../src/middlewares/requireLogin')

  var Routes = function(app) {

    // Home Page
    app.get('/', function(req, res) {
      if (req.user) {
        return res.render("home", {homepage: true, user: req.user});
      }
      res.render('home', {homepage: true});
    });

    // Logging in user (new user session)
    app.post('/login', user_sessions_controller.create);
    app.get('/logout', user_sessions_controller.destroy);
    app.get('/auth/facebook', user_sessions_controller.new_facebook_session);
    app.get('/auth/facebook/callback', user_sessions_controller.middlewares.fb_callback,
            user_sessions_controller.fb_callback);

    // Creating a  new user
    app.post('/users', users_controller.create);

    // Verifying a user's email
    app.get('/verify', users_controller.verify);
    app.get('/resend_verification',
            users_controller.middlewares.resend_verification,
            users_controller.resend_verification)

    // Video's page
    app.get("/premium", media_controller.middlewares.index,
            media_controller.index);
    app.get("/videos/:file", media_controller.middlewares.stream,
            media_controller.stream);

    // New payment
    app.get('/payments/new', payments_controller.middlewares.create,
            payments_controller.create);

    // Mollie webhook
    app.post('/mollie_webhook', payments_controller.sync)

    // Mollie redirect stuff
    app.get('/thankyou', function(req, res) {
      res.render("thankyou");
    });

  }

  module.exports = Routes;

}())
