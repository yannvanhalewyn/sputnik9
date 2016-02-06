'use strict';

var userCrypto = require('./user_crypto')

module.exports = {

  /**
   * Sets a password reset token and expiration date on given user
   *
   * @param {Object} user The user object to be the receiver of the token
   * @returns {Promise/Object} A promise for the persisted user with updated
   * fields
   */
  setResetToken(user) {
    return userCrypto.expiringToken().then(token => {
      user.local_data.password_reset_token = token.data
      user.local_data.password_reset_expiration = token.expires
      return user.save()
    })
  }
}
