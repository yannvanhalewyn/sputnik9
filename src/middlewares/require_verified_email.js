(function() {

  "use strict";

  var requireVerifiedEmail = function(req, res, next) {
    if (req.user.provider == 'local' && !req.user.local_data.verified) {
      return res.render("please_verify_email");
    }
    next();
  }

  module.exports = requireVerifiedEmail;

}())
