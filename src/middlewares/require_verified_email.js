(function() {

  "use strict";

  var requireVerifiedEmail = function(req, res, next) {
    if (!req.user.verified) {
      return res.send("Please verify your email address before accessing this sweet content!")
    }
    next();
  }

  module.exports = requireVerifiedEmail;

}())
