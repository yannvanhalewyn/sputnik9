(function() {

  "use strict";

  var paymentGateway = require('./payment_gateway')
    , Payment = require('./payment')

  function paymentOptions(user_id) {
    return {
      amount: 20,
      description: "Premium content Sputnik9.nl",
      redirectUrl: "http://www.sputnik9.nl/checkout",
      metadata: { user_id: user_id }
    }
  }

  var paymentLogic = {

    payForPremium: function(user) {
      return paymentGateway.create(paymentOptions(user._id))
      .then(function(payment) {
        return Payment.create(payment).then(function(db_payment) {
          return user.addPayment(db_payment).then(function(user) {
            return db_payment
          })
        })
      })
    }

  }

  module.exports = paymentLogic;

}())
