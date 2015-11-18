(function() {

  "use strict";

  var handle_unpaid_user = function(err, req, res, next) {
    if (req.user.payments.length == 0) return res.render('prompt-payment', {user: req.user});
    // req.user.verifyPayments().then(function() {
      // res.render("media")
      res.render('prompt-payment', {user: req.user})
      // res.send("still needs implementing")
    // })
  }

  module.exports = handle_unpaid_user;

}())
