(function() {

  "use strict";

  var User = require('../models/user');

  function isAnyPaymentGood(payments) {
    return  payments.some(function(payment) {
      if (!payment.status) return false;
      return payment.status == "paid" || payment.status == "paidoff";
    })
  }

  var handle_unpaid_user = function(err, req, res, next) {
    // If user has no open payments, show prompt for payment
    if (req.user.payments.length == 0) return res.render('prompt-payment', {user: req.user});

    // If he does, check if any payments we're actually valid. If so, update his
    // premium status and render the media page
    User.findById(req.user._id).populate("payments").then(function(user) {
      if (isAnyPaymentGood(user.payments)) {
        user.premium = true;
        user.save()
        res.render("media")
      }
      else res.render("prompt-payment")
    })
  }

  module.exports = handle_unpaid_user;

}())
