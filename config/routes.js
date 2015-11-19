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
        return res.redirect("/media")
      }
      res.render('index', { title: "Hello!", message: "Hello there!" });
    });

    // Login/signup Page
    app.get('/login', function(req, res) {
      if (req.user) return res.redirect('/media')
      res.render("login");
    });

    // Logging in user (new user session)
    app.post('/login', user_sessions_controller.create);
    app.get('/logout', user_sessions_controller.destroy);

    // Creating a  new user
    app.post('/users', users_controller.create);

    // Verifying a user's email
    app.get('/verify', users_controller.verify);

    // Video's page
    app.get("/media", media_controller.middlewares.index,
            media_controller.index);
    app.get("/media/:id", media_controller.middlewares.index,
            media_controller.show);

    // New payment
    app.get('/payments/new', payments_controller.middlewares.create,
            payments_controller.create);

    // Mollie webhook
    app.get('/mollie_webhook', payments_controller.sync)

    // Mollie redirect stuff
    app.get('/checkout', function(req, res) {
      res.send("Checkout")
    });

  }

  module.exports = Routes;

}())
