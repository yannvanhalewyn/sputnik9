(function() {

  "use strict";

  var User = require('../models/user')
    , Logger = require('../lib/logger');

  var getLoggedInUser = function(req, res, next) {
    if (req.session.user_id) {
      return User.findById(req.session.user_id).then(function(user) {
        Logger.info({user: {
          first_name: user.first_name,
          last_name: user.last_name,
          _id: user._id.toString(),
          premium: user.premium ? "true" : "false"
        }})
        req.user = user;
        next();
      }, next);
    } else {
      req.user = null;
      next();
    }
  }

  module.exports = getLoggedInUser;

}())
