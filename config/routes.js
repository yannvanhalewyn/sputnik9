(function() {

  "use strict";

  var users_controller = require('../src/controllers/users_controller');

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
    app.get('/premium', function(req, res) {
      res.send("The premium space. You are logged in as: " + req.user)
    });

    // Logging in user (new user session)
    app.post('/login', function(req, res) {
      res.send(req.body);
    });

    // Creating a  new user
    app.post('/signup', users_controller.create);

  }

  module.exports = Routes;

}())
