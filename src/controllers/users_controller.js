(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')
    , formatValidationErrors = require("../helpers/format_mongoose_validation_errors")
    , login = require('../helpers/login_user')
    , mailer = require('../helpers/mailer')
    , emails = require('../helpers/emails')

  var users_controller = {

    create: function(req, res) {

      bcrypt.hash(req.body.password, 10).then(function(hash) {

        User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password_digest: hash
        }).then(

          // Successfull user creation!
          function(user) {
            login(user, req);
            mailer.send(emails.emailConfirmation(user))
            res.send("Success!");
          },

          // Erroneous user creation.
          function(err) {
            res.render("login", {
              values: req.body,
              errors: formatValidationErrors(err)
            });
          }
        );
      });
    },

    verify: function(req, res) {
      User.verify(req.query.token).then(
        function(user) {
          login(user, req);
          res.send("Successfully verified! Hello " + user.first_name)
        },
        function(err) {
          res.send("Verification failed. " + err)
        }
      )
    }
  }


  module.exports = users_controller;

}())
