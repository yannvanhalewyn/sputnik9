(function() {

  "use strict";

  // Controllers
  var users_controller = require('../src/controllers/users_controller')
    , user_sessions_controller = require('../src/controllers/user_sessions_controller')

  // Middlewares
  var requireLogin = require('../src/middlewares/requireLogin')

  var Routes = function(app) {

    // Home Page
    app.get('/', function(req, res) {
      res.render('index', { title: "Hello!", message: "Hello there!" });
    });

    // Login Page
    app.get('/login', function(req, res) {
      res.render("login");
    });

    // Signup Page
    app.get('/signup', function(req, res) {
      res.render('signup');
    });

    // Premium page
    app.get('/premium', requireLogin, function(req, res) {
      if (!req.user.verified) {
        return res.send("Please verify your email address before accessing this sweet content!");
      }
      res.send("The premium space. You are logged in as: " + req.user)
    });

    // Logging in user (new user session)
    app.post('/login', user_sessions_controller.create);
    app.get('/logout', user_sessions_controller.destroy);

    // Creating a  new user
    app.post('/users', users_controller.create);

    app.get('/verify', users_controller.verify);

  }

  module.exports = Routes;

}())
