(function() {

  "use strict";

  var login = function(user, req) {
    req.session.user_id = user._id;
  }

  module.exports = login;

}())
