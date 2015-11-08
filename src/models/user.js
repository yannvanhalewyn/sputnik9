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
      type: String
    },
    token_expiration: {
      type: Date
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

  module.exports = User;

}())
