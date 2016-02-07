"use strict";

var Q           = require('q')
  , mongoose    = require('mongoose')
  , user_crypto = require('../lib/user_crypto')

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
    verified: Boolean,
    confirmation_token: String,
    token_expiration: Date,
    password_reset_token: String,
    password_reset_expiration: Date,
    password_digest: String
  }
});

userSchema.methods = {
  /**
   * Adds a payment reference to the user's payments array
   *
   * @param {Object} payment The payment to be referenced
   * @returns {Promise} A promise for the updated persisted user
   */
  addPayment(payment) {
    this.payments.push(payment._id)
    return this.save();
  },

  /**
   * Resets the user's email verification confirmation token
   *
   * @returns {Promise} The promise for the updated and persisted user object
   */
  resetConfirmationToken() {
    if (this.provider != 'local' || this.local_data.verified)
      return Q.reject('Deze gebruiker heeft geen bevestiging nodig.')

    return user_crypto.expiringToken().then(token => {
      this.local_data.confirmation_token = token.data;
      this.local_data.token_expiration = token.expires;
      return this.save();
    })
  },

  /**
   * Hashes the new_password and stores it as the user's password_digest
   *
   * @param {String} new_password The new password to be hashed and stored
   * @returns {Promise} A promise for the updated and persisted user object
   */
  resetPassword(new_password) {
    return user_crypto.hashPassword(new_password).then(hash => {
      this.local_data.password_digest = hash
      this.local_data.password_reset_token = null
      this.local_data.password_reset_expiration = null
      return this.save()
    })
  }
}


/*
 * =====
 * MODEL
 * =====
 */
var User = mongoose.model('User', userSchema);

/*
 * =========
 * Functions
 * =========
 */

/**
 * Creates a new user. Depending on the params.provider value, a confirmation
 * token and expiration is generated for the user's email address
 *
 * @param {Object} params The params for the new user.
 * @return {Promise} A promise for the new persisted user object.
 */
User.create = params => {
  if (params.provider == 'local') {
    return Q.all([user_crypto.hashPassword(params.password), user_crypto.expiringToken()])
    .spread((hash, token) => {
      if (!params.local_data) params.local_data = {}
      params.local_data.confirmation_token = token.data,
      params.local_data.token_expiration = token.expires,
      params.local_data.password_digest = hash
      return new User(params).save()
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
User.verify = token => {
  if (!token) return Q.reject('Geen token gegeven.')
  return User.findOne({
    "local_data.confirmation_token": token,
    "local_data.token_expiration": { "$gt": Date.now() }
  }).then(user => {

    if (!user) throw `Geen gebruiker gevonden met token ${token}`

    user.local_data.verified = true;
    user.local_data.confirmation_token = null;
    user.local_data.token_expiration = null;
    return user.save();
  })
}

User.notifiable = () => User.find({receive_emails: true})

module.exports = User;
