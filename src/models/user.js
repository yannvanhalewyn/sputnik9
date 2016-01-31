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
    premium: Boolean,
    receive_emails: {
      type: Boolean,
      default: true
    },
    payments: [
      {type: mongoose.Schema.Types.ObjectId, ref: "Payment"}
    ],
    admin: {
      type: Boolean,
      default: false
    },
    provider: String,
    fb_data: {
      id: String,
      accessToken: String
    },
    local_data: {
      verified: {
        type: Boolean,
        default: false
      },
      confirmation_token: String,
      token_expiration: Date,
      password_digest: String
    }
  });

  userSchema.methods = {
    addPayment: function(payment) {
      this.payments.push(payment._id)
      return this.save();
    },

    resetConfirmationToken() {
      if (this.provider != 'local' || this.local_data.verified) {
        // Return a promise that will reject
        var defered = Q.defer();
        defered.reject("Confirmation Tokens are not applicable for this user.");
        return defered.promise;
      }

      return generateConfirmationTokenAndExpiration().then((token) => {
        this.local_data.confirmation_token = token.token;
        this.local_data.token_expiration = token.expires;
        return this.save();
      })
    }
  }


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

  /**
   * Creates a new user. Depending on the params.provider value, a confirmation
   * token and expiration is generated for the user's email address
   *
   * @param {Object} params The params for the new user.
   * @return {Promise} A promise for the new persisted user object.
   */
  User.create = function(params) {
    if (params.provider == 'local') {
      return generateConfirmationTokenAndExpiration().then(function(token) {
        params.local_data.confirmation_token = token.token;
        params.local_data.token_expiration = token.expires;
        return new User(params).save();
      })
    }
    else return new User(params).save();
  }

  /**
   * Attempts to find a certain user by it's facebook id. If not found, it will
   * create a new one with the supplied data.
   *
   * @param {String} fbid The facebook ID of the user to be found / created
   * @param {Object} data The data for creating the user if necessary
   * @return {Object} The object representing the found/created user.
   */
  User.findOrCreateByFacebookId = function(fbid, data) {
    return User.find({"fb_data.id": fbid}).then(function(found) {
      if (found.length == 0)
        return User.create(data);
      else
        return found[0]
    })
  }

  /**
   * Verifies a user via a confirmation token. If the user is found with said
   * token and the token is not yet expired, user's local_data.verified will be
   * set to true and the token will be deleted.
   *
   * @param {String} token The confirmation token
   * @return {Promise} A promise for the user. Will reject the promise if no
   * user was found with said token.
   */
  User.verify = function(token) {
    return User.find({"local_data.confirmation_token": token}).then(function(found) {

      if (found.length == 0) throw "No user found with token " + token;

      var user = found[0];
      if (user.local_data.token_expiration.getTime() < Date.now())
        throw "This token has been expired."

      user.local_data.verified = true;
      user.local_data.confirmation_token = null;
      user.local_data.token_expiration = null;
      return user.save();
    })
  }

  User.notifiable = () => User.find({receive_emails: true})

  module.exports = User;

}())
