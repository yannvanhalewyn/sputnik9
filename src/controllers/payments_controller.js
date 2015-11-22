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
      if (req.user.premium) return res.redirect("/media")
      paymentLogic.payForPremium(req.user, req.headers.host)
      .then(function (payment) {
        res.redirect(payment.links.paymentUrl)
      }).catch(next)
    },

    sync: function(req, res) {
      if (!req.body.id) res.status(500).send("No payment ID was provided.");
      paymentLogic.resync(req.body.id)
      .then(
        res.sendStatus.bind(res, 200),
        function(err) {
          console.error("ERROR: ", err);
          res.status(500).send(err)
        }
      )
    }
  }

  module.exports = payments_controller;

}())
