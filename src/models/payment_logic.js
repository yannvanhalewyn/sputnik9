(function() {

  "use strict";

  var paymentGateway = require('./payment_gateway')
    , Payment = require('./payment')
    , User = require('./user')

  function paymentOptions(user_id, host) {
    return {
      amount: 20,
      description: "Premium content Sputnik9.nl",
      redirectUrl: "http://" + host + "/thankyou", // TODO update
      metadata: { user_id: user_id }
    }
  }

  function isPaid(payment) {
    if (payment.status)
      return (payment.status == "paid" || payment.status == "paidoff")
    return false
  }

  var paymentLogic = {

    /**
     * Initiates the processing for making a user premium. It creates a payment
     * with Mollie, stores that payment in the database. Finally it add's that
     * payment to the user's payments array.
     *
     * @param {object} user the user object
     * @param {string} hostForRedirect the host at which Mollie's redirect URL
     * should point.
     * @return {object} The representation of the Payment in the Database.
     */
    payForPremium: function(user, hostForRedirect) {
      return paymentGateway.create(paymentOptions(user._id, hostForRedirect))
      .then(function(payment) {
        return Payment.create(payment).then(function(db_payment) {
          return user.addPayment(db_payment).then(function(user) {
            return db_payment
          })
        })
      })
    },

    /**
     * Makes sure a mollie payment, database payment and user premium status are
     * updated correctly.
     *
     * @param {string} mollie_id The payment id for Mollie
     */
    resync: function(mollie_id) {
      console.log("Resyncing Mollie payment: ", mollie_id);
      return Payment.syncWithMollie(mollie_id).then(function(payment) {
        return Payment.findOne({mollie_id: payment.id})
        .then(function(payment_db) {
          return User.findOne({payments: payment_db._id})
          .then(function(user) {
            var premium = isPaid(payment)
            if (user.premium != premium) {
              user.premium = premium;
              return user.save();
            }
          })
        })
      })
    }

  }

  module.exports = paymentLogic;

}())
