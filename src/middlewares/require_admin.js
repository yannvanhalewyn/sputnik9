(function() {

  "use strict";

  var requireAdmin= function(req, res, next) {
    if (req.user && req.user.admin) {
      return next();
    }
    req.session.flash = {type: "error", message: "You must be logged in to view that page."}
    res.redirect("/login");
  }

  module.exports = requireAdmin;

}())
