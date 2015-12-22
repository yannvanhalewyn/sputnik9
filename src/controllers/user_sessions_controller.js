(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')
    , login = require('../helpers/login_user')
    , verifyUserPassword = require('../helpers/verify_user_password')

  var user_sessions_controller = {

    create: function(req, res) {
      verifyUserPassword(req.body.email, req.body.password)
      .then(function(verifiedUser) {
        // Login successful
        if (verifiedUser) {
          login(verifiedUser, req);
          return res.redirect("/premium")
        }
        // Erroneous login
        req.session.flash = {
          type: "error",
          message: "Email or password was incorrect."
        }
        res.redirect("/")
      });
    },

    destroy: function(req, res) {
      req.session.destroy();
      res.redirect("/");
    }
  }

  module.exports = user_sessions_controller;

}())
