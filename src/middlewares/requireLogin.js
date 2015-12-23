(function() {

  "use strict";

  var requireLogin = function(req, res, next) {
    if (req.user) return next();
    req.session.flash = {
      type: "error",
      message: "You must be logged in to view that page."
    }
    res.redirect("/");
  }

  module.exports = requireLogin;

}())
