'user strict';

var User = require('../models/user')
  , password = require('../lib/password')
  , emails = require('../helpers/emails')
  , mailer = require('../lib/mailer')

module.exports = {

  // POST /users/forgot
  forgot(req, res, next) {
    User.findOne({email: req.body.email}).then(user => {
      if (!user) return next(`Geen gebruiker gevonden met email ${req.body.email}`)
      return password.setResetToken(user).then(user => {
        return emails.password_reset(user).then(mailer.send).then(() => {
          req.session.flash = { type: 'success', message: 'Wachtwoord reset email is verstuurd!' }
          res.redirect('/')
        })
      })
    }, next)
  },

  // GET /users/reset/:token
  show_reset_password(req, res) {

  },

  // POST /users/reset/:token
  reset_password(req, res) {

  }
}
