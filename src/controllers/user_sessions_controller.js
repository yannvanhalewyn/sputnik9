(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')

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
              req.session.user_id = user._id;
              res.redirect("/premium");

            // Else reprompt login with error
            } else {
              res.render("login", {error: "Incorrect"});
            }
          });

        // If no user with email, reprompt login with error.
        } else {
          res.render("login", {
            error: "Email or password was incorrect."
          });
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
