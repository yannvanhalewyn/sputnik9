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
    createdDateTime: Date,
    paidDateTime: Date,
    cancelledDateTime: Date,
    details: {
      consumerName: String,
      consumerAccount: String,
      consumerBic: String
    },
    links: {
      paymentUrl: String,
      redirectUrl: String
    }
  })

  var Payment = mongoose.model("Payment", paymentSchema);

  Payment.create = function(opts) {
    if (!opts.mollie_id && opts.id) {
      opts.mollie_id = opts.id;
      delete opts.id;
    }

    return new Payment(opts).save();
  }

  Payment.syncWithMollie = function(mollie_id) {
    return paymentGateway.get(mollie_id).then(function(payment) {
      return Payment.update({mollie_id: mollie_id}, payment)
    })
  }

  module.exports = Payment;

}())

