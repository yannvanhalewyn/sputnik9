'use strict';

var User = require('../models/user');

module.exports = (req, res, next) => {
  return User.findOne({
    "local_data.password_reset_token": req.params.token,
    "local_data.password_reset_expiration": { $gt: Date.now() }
  }).then(user => {
    if (!user) {
      req.session.flash = {
        type: 'success',
        message: 'Deze wachtwoord reset pagina bestaat niet of is expired'
      }
      return res.redirect('/')
    }
    req.user = user
    next()
  })
}
