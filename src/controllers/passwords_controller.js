'user strict';

var User = require('../models/user')
  , password = require('../lib/password')
  , emails = require('../helpers/emails')
  , mailer = require('../lib/mailer')
  , getUserByPasswordResetToken = require('../middlewares/get_user_by_password_reset_token')

var getUserByResetToken = (token) => {
  return User.findOne({
    "local_data.password_reset_token": token,
    "local_data.password_reset_expiration": { $gt: Date.now() }
  })
}

module.exports = {

  middlewares: {
    show_reset_password: [ getUserByPasswordResetToken ],
    reset_password: [ getUserByPasswordResetToken ]
  },

  // POST /users/forgot
  forgot(req, res, next) {
    User.findOne({email: req.body.email}).then(user => {
      // No user found
      if (!user) {
        req.session.flash = {
          type: 'error',
          message: `Geen gebruiker gevonden met email ${req.body.email}`
        }
        return res.redirect('/users/forgot')
      }
      // User found
      return password.setResetToken(user).then(user => {
        return emails.password_reset(user).then(mailer.send).then(() => {
          req.session.flash = { type: 'success', message: 'Wachtwoord reset email is verstuurd!' }
          res.redirect('/')
        })
      })
    }, next)
  },

  // GET /users/reset/:token
  show_reset_password(req, res, next) {
    res.render('password_reset')
  },

  // POST /users/reset/:token
  reset_password(req, res, next) {
    req.user.resetPassword(req.body.password).then(u => {
      req.session.flash = ({
        type: 'success',
        message: 'Je wacthwoord is gereset. Je kan nu inloggen met je nieuwe wachtwoord'
      })
      res.redirect('/')
    })
  }
}
