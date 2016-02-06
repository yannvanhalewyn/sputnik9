(function() {

  "use strict";

  var User                   = require('../models/user')
    , bcrypt                 = require('../helpers/bcrypt-promisified')
    , formatValidationErrors = require("../helpers/format_mongoose_validation_errors")
    , login                  = require('../helpers/login_user')
    , mailer                 = require('../lib/mailer')
    , emails                 = require('../helpers/emails')
    , Logger                 = require('../lib/logger')
    , UnlockCode             = require('../models/unlock_code')
    , requireLogin           = require('../middlewares/requireLogin')
    , unsubscribe            = require('../lib/unsubscribe')

  var users_controller = {

    middlewares: {
      show: [requireLogin],
      update: [requireLogin],
      resend_verification: [requireLogin],
      use_unlock_code: [requireLogin]
    },

    show(req, res) {
      res.render('user_preferences')
    },

    update(req, res) {
      if (req.body.password) {
        req.user.resetPassword(req.body.password).then(u => {
          res.send('ok')
        }, err => res.send(err))
      }
    },

    create: function(req, res) {

      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        receive_emails: Boolean(req.body.receive_emails),
        provider: 'local',
        password: req.body.password
      }).then(

        // Successfull user creation!
        user => {
          login(user, req);
          emails.emailConfirmation(user).then(mailer.send).catch(Logger.error)
          res.redirect('/premium')
        },

        // Erroneous user creation.
        err => {
          req.session.flash = {
            type: "error",
            message: formatValidationErrors(err)
          }
          res.redirect("/");
        }
      );
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
          emails.emailConfirmation(user).then(mailer.send).then(

            // Email was sent successfully
            () => {
            req.session.flash = {type: 'success', message: 'Email bevestiging werd verstuurd!'}
            res.redirect('/premium')
          },

            // Email was not sent successfully
            (err) => {
              req.session.flash = {type: 'error', message: 'Email bevestiging kon niet worden verstuurd.'}
              res.redirect('/premium')
            }
          )
        },

        // Confirmation has not been updated (not applicable)
        (err) => {
          req.session.flash = {type: "error", message: err}
          res.redirect('/premium')
        }
      )
    },

    use_unlock_code: function(req, res) {
      UnlockCode.findOne({code: req.query.code}).then((uc) => {
        // Code does not exist
        if (!uc) {
          req.session.flash = {type: 'error', message: 'Deze code bestaat niet.'}
          return res.redirect('/premium')
        }

        uc.use(req.user).then(response => {
          // Code is valid and has been used on user
          req.session.flash = {type: "success", message: 'Deze code klopt! Je bent nu premium.'}
          res.redirect('/premium')
        }, err => {
          // Code was not valid (eg already in use)
          req.session.flash = {type: 'error', message: 'Deze code is al eens gebruikt.'}
          res.redirect('/premium')
        })
      })
    },

    unsubscribe(req, res) {
      unsubscribe(req.query.u).then(
        () => res.render('unsubscribed'),
        (err) => res.render('unsubscribed', {error: err})
      )
    }
  }


  module.exports = users_controller;

}())
