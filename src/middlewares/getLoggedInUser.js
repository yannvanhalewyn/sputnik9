(function() {

  "use strict";

  var User = require('../models/user');

  var getLoggedInUser = function(req, res, next) {
    if (req.session.user_id) {
      return User.findById(req.session.user_id).then(function(user) {
        req.user = user;
        next();
      }, console.error);
    } else {
      req.user = null;
      next();
    }
  }

  module.exports = getLoggedInUser;

}())
