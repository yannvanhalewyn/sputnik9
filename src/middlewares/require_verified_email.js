(function() {

  "use strict";

  var requireVerifiedEmail = function(req, res, next) {
    if (!req.user.verified) {
      return res.render("please_verify_email");
    }
    next();
  }

  module.exports = requireVerifiedEmail;

}())
