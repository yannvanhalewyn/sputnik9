(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')
    , login = require('../helpers/login_user')

  var user_sessions_controller = {

    create: function(req, res) {
      // Find the user that's trying to login
      User.findOne({email: req.body.email}).then(function(user) {
        if (user) {

          // Compare the given password to the digest
          bcrypt.compare(req.body.password, user.password_digest)
          .then(function(result) {

            // If password is correct, redirect to home page
            if (result) {
              login(user, req);
              res.redirect("/premium");

            // Else reprompt login with error
            } else {
              req.session.flash = {
                type: "error",
                message: "Email or password was incorrect."
              };
              res.redirect("/login");
            }
          });

        // If no user with email, reprompt login with error.
        } else {
          req.session.flash = {
            type: "error",
            message: "Email or password was incorrect."
          };
          res.redirect("/login");
        }
      })
    },

    destroy: function(req, res) {
      req.session.destroy();
      res.redirect("/");
    }
  }

  module.exports = user_sessions_controller;

}())
