(function() {

  "use strict";

  var include = require('include')
    , Mollie = require('mollie-api-node')
    , Q = require('q')

  var mollie = new Mollie.API.Client;
  mollie.setApiKey(process.env.MOLLIE_API_KEY);

  var paymentGateway = {
    get: function(id) {
      var defered = Q.defer();
      mollie.payments.get(id, function(payment) {
        console.log("Got mollie payment:", payment);
        if (payment.error) defered.reject(payment.error);
        else if (payment.id != id) defered.reject(errorIdsDontMatch(id, payment.id))
        else defered.resolve(payment);
      });
      return defered.promise;
    },

    create: function(opts) {
      if (!opts.amount) throw "Amount not supplied int opts";

      console.log("Creating payment for mollie", opts);

      var defered = Q.defer();

      mollie.payments.create(opts, function(payment) {
        console.log("Got responde from mollie", payment);
        if (payment.error) defered.reject(payment.error);
        else defered.resolve(payment);
      });

      return defered.promise;
    }
  }

  module.exports = paymentGateway;

  function errorIdsDontMatch(requested, received) {
    return "Incorrect Mollie return data. Requested payment id={{req}} and got id={{res}}"
    .replace("{{req}}", requested)
    .replace("{{res}}", received)
  }

}())
