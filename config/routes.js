(function() {

  "use strict";

  // Controllers
  var users_controller         = require('../src/controllers/users_controller')
    , adminController          = require('../src/controllers/admin_controller')
    , user_sessions_controller = require('../src/controllers/user_sessions_controller')
    , media_controller         = require('../src/controllers/media_controller')
    , payments_controller      = require('../src/controllers/payments_controller')
    , uc_controller            = require('../src/controllers/unlock_codes_controller')

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
    app.get('/get-premium', users_controller.middlewares.use_unlock_code,
            users_controller.use_unlock_code)
    app.get('/unsubscribe', users_controller.unsubscribe)

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

    // Admin panel
    app.get('/admin', adminController.middlewares.index, adminController.index)
    app.get('/admin/users', adminController.middlewares.users, adminController.users)
    app.get('/admin/users.csv', adminController.middlewares.users, adminController.usersCSV)

    // Unlock Codes
    app.post('/unlock_codes', uc_controller.middlewares.post, uc_controller.post)
  }

  module.exports = Routes;

}())
