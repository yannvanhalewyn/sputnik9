(function() {

  "use strict";

  var requireLogin = function(req, res, next) {
    if (req.user) {
      return next();
    }
    res.render("login", {error: "You must be logged in to view that page."});
  }

  module.exports = requireLogin;

}())
