(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')
    , formatValidationErrors = require("../helpers/format_mongoose_validation_errors")
    , login = require('../helpers/login_user')
    , mailer = require('../helpers/mailer')
    , emails = require('../helpers/emails')
    , Logger = require('../lib/logger')
    , requireLogin = require('../middlewares/requireLogin')

  var users_controller = {

    middlewares: {
      resend_verification: [requireLogin]
    },

    create: function(req, res) {

      bcrypt.hash(req.body.password, 10).then(function(hash) {

        User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          provider: 'local',
          local_data: {
            password_digest: hash
          }
        }).then(

          // Successfull user creation!
          function(user) {
            login(user, req);
            emails.emailConfirmation(user).then(mailer.send, Logger.error);
            res.redirect('/premium')
          },

          // Erroneous user creation.
          function(err) {
            req.session.flash = {
              type: "error",
              message: formatValidationErrors(err)
            }
            res.redirect("/");
          }
        );
      });
    },

    verify: function(req, res, next) {
      User.verify(req.query.token).then(
        function(user) {
          login(user, req);
          req.session.flash = {type: "success", message: "Verification successful!"}
          res.redirect("/premium")
        },
        next
      )
    },

    resend_verification: function(req, res) {
      req.user.resetConfirmationToken().then(

        // Confirmation token has been updated
        (user) => {
          emails.emailConfirmation(user).then(mailer.send, Logger.error);
          req.session.flash = {type: "success", message: "Verification email has been sent!"}
          res.redirect('/premium')
        },

        // Confirmation has not been updated (not applicable)
        (err) => {
          req.session.flash = {type: "error", message: err}
          res.redirect('/premium')
        }
      )
    }
  }


  module.exports = users_controller;

}())
