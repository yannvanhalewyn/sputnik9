(function() {

  "use strict";

  // Controllers
  var user_sessions_controller = require('../src/controllers/user_sessions_controller')
    , media_controller         = require('../src/controllers/media_controller')
    , payments_controller      = require('../src/controllers/payments_controller')
    , uc_controller            = require('../src/controllers/unlock_codes_controller')
    , admin_router             = require('../src/routers/admin_router')
    , users_router             = require('../src/routers/users_router')

  // Middlewares
  var requireLogin = require('../src/middlewares/requireLogin')
  var paywall = require('../src/middlewares/paywall');

  var Routes = function(app) {

    // Home Page
    app.get('/', (req, res) => {
      if (req.user && req.user.premium) return res.redirect('/premium')
      res.render('home', { homepage: true, user: req.user })
    });

    // Logging in user (new user session)
    app.post('/login', user_sessions_controller.create);
    app.get('/logout', user_sessions_controller.destroy);
    app.get('/auth/facebook', user_sessions_controller.new_facebook_session);
    app.get('/auth/facebook/callback', user_sessions_controller.middlewares.fb_callback,
            user_sessions_controller.fb_callback);

    // User routes
    app.use('/users', users_router);

    // Video's page
    app.get("/premium", media_controller.middlewares.index,
            media_controller.index);

    // New payment
    app.get('/payments/new', payments_controller.middlewares.create,
            payments_controller.create);

    // Mollie webhook
    app.post('/mollie_webhook', payments_controller.sync)

    // Mollie redirect stuff
    app.get('/thankyou', (req, res) => res.render('thankyou'));

    // Admin panel
    app.use('/admin', admin_router)

    // Unlock Codes
    app.post('/unlock_codes', uc_controller.middlewares.post, uc_controller.post)
  }

  module.exports = Routes;

}())
