(function() {

  "use strict";

  var paywall = function(req, res, next) {
    if (req.user.premium) return next();
    next("User '{{id}}' is not a premium user.".replace("{{id}}", req.user._id));
  }

  module.exports = paywall;

}())
