(function() {

  "use strict";

  var User = require('../models/user')
  var bcrypt = require('./bcrypt-promisified');

  var verifyUserPassword = function(email, password) {
    return User.findOne({email: email}).then(function(user) {
      if (!user) return false;
      return bcrypt.compare(password, user.password_digest)
      .then(function(valid) {
        if (valid) return user;
        return false;
      });
    });
  }

  module.exports = verifyUserPassword;

}())
