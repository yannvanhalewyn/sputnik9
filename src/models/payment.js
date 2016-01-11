(function() {

  "use strict";

  var mongoose = require('mongoose')
    , paymentGateway = require('./payment_gateway')
    , Q = require('q')

  var paymentSchema = mongoose.Schema({
    mollie_id: {
      type: String,
      unique: true
    },
    amount: Number,
    description: String,
    method: String,
    status: String,
    createdDatetime: Date,
    paidDatetime: Date,
    cancelledDatetime: Date,
    details: {
      consumerName: String,
      consumerAccount: String,
      consumerBic: String
    },
    links: {
      paymentUrl: String,
      redirectUrl: String
    },
    metadata: Object
  })

  var Payment = mongoose.model("Payment", paymentSchema);

  Payment.create = function(opts) {
    if (!opts.mollie_id && opts.id) {
      opts.mollie_id = opts.id;
      delete opts.id;
    }

    return new Payment(opts).save();
  }

  /**
   * Calls up mollie API and presists returning data for payment with id
   * $mollie_id
   *
   * @param {string} mollie_id The ID of the payment for Mollie
   * @return {object} The object that the mollie API returned to us
   */
  Payment.syncWithMollie = function(mollie_id) {
    return paymentGateway.get(mollie_id).then(function(payment) {
      return Payment.findOneAndUpdate({mollie_id: mollie_id}, payment)
      .then(function(found) {
        if (!found) throw "No such payment in our database: " + mollie_id
        return payment;
      })
    })
  }

  module.exports = Payment;

}())

