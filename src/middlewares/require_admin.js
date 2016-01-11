(function() {

  "use strict";

  var requireAdmin = function(req, res, next) {
    if (!req.user) {
      req.session.flash = {type: "error", message: "You must be logged in to view that page."}
      return res.redirect("/");
    } else if (!req.user.admin) {
      req.session.flash = {type: "error", message: "You must be an admin to view that page."}
      return res.redirect("/");
    }
    next();
  }

  module.exports = requireAdmin;

}())
