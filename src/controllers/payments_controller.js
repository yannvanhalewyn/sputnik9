(function() {

  "use strict";

  var requireLogin = require('../middlewares/requireLogin')
    , requireVerifiedEmail = require('../middlewares/require_verified_email')
    , paymentLogic = require('../models/payment_logic')
    , Payment = require('../models/payment')
    , User = require('../models/user')

  var payments_controller = {
    middlewares: {
      create: [requireLogin, requireVerifiedEmail]
    },

    create: function(req, res, next) {
      paymentLogic.payForPremium(req.user, req.headers.host)
      .then(function (payment) {
        res.redirect(payment.links.paymentUrl)
      }).catch(next)
    },

    sync: function(req, res) {
      Payment.syncWithMollie(req.query.id).then(function(payment) {
        if (payment.status == "paid") {
          return User.findOne({payments: payment._id}).then(function(user) {
            if (user) {
              user.premium = true;
              return user.save().then(function() {
                res.sendStatus(200);
              })
            }
            return res.err("No user found that has paymentid " + payment._id)
          })
        } else {
          res.sendStatus(200);
        }
      }).catch(res.send)
    }
  }

  module.exports = payments_controller;

}())
