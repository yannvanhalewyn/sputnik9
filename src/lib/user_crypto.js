var crypto = require('crypto')
  , bcrypt = require('../helpers/bcrypt-promisified')
  , Q      = require('q')

const TOKEN_LENGTH = 48
const EXPIRATION_TIME = 24 * 3600 * 1000

module.exports = {

  /**
   * Generates a random token of 48 hex chars with an expiration date set to
   * tomorrow.
   *
   * @returns {Promise} The promise for the token
   */
  expiringToken() {
    return Q.nfcall(crypto.randomBytes, TOKEN_LENGTH / 2).then(buf => ({
      data: buf.toString('hex'),
      expires: Date.now() + EXPIRATION_TIME
    }))
  },

  /**
   * Hashes a password into a verifiable bcrypt hash
   *
   * @param {String} password The password to be hashed
   * @returns {Promise} The promise for the hash (String)
   */
  hashPassword(password) {
    return bcrypt.hash(password, 10)
  }
}
