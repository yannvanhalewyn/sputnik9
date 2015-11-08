(function() {

  "use strict";

  var crypto = require('crypto')
    , Q = require('q')
    , mongoose = require('mongoose');

  /*
   * ======
   * SCHEMA
   * ======
   */
  var userSchema = mongoose.Schema({
    first_name: {
      type: String,
      minlength: 3,
      required: true
    },
    last_name: {
      type: String,
      minlength: 3,
      required: true
    },
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true,
      unique: true
    },
    confirmation_token: {
      type: String,
      unique: true
    },
    token_expiration: {
      type: Date
    },
    verified: {
      type: Boolean,
      default: false
    },
    password_digest: String
  });


  /*
   * =====
   * MODEL
   * =====
   */
  var User = mongoose.model('User', userSchema);

  var TOKEN_LENGTH = 48;
  var EXPIRATION_TIME = 24 * 3600 * 1000;

  /*
   * =========
   * Functions
   * =========
   */

  // Generate a confirmation token and expiration date
  function generateConfirmationTokenAndExpiration() {

    var defered = Q.defer();

    crypto.randomBytes(TOKEN_LENGTH / 2, function(err, buf) {
      if (err) return defered.reject(err);
      defered.resolve({
        token: buf.toString('hex'),
        expires: Date.now() + EXPIRATION_TIME
      });
    });

    return defered.promise;
  }

  User.create = function(params) {
    return generateConfirmationTokenAndExpiration().then(function(token) {
      params.confirmation_token = token.token;
      params.token_expiration = token.expires;
      return new User(params).save();
    })
  }

  User.verify = function(token) {
    return User.find({confirmation_token: token}).then(function(found) {

      if (found.length == 0) throw "No user found with token " + token;

      var user = found[0];
      if (user.token_expiration.getTime() < Date.now())
        throw "This token has been expired."

      user.verified = true;
      user.confirmation_token = null;
      user.token_expiration = null;
      return user.save();
    })
  }

  module.exports = User;

}())
