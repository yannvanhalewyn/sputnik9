var User = require('../../src/models/user')
  , userFixture = require('../fixtures/user')
  , _ = require('lodash')

const ONE_DAY = 24 * 3600 * 1000

module.exports = {
  default(params) {
    return User.create(_.merge({}, userFixture, params))
  },

  subscribed() {
    return User.create(_.merge({receive_emails: true}, userFixture))
  },

  unsubscribed() {
    return User.create(_.merge({receive_emails: false}, userFixture))
  },

  with_password_reset_token() {
    return User.create(_.merge({
      local_data: {
        password_reset_token: '123',
        password_reset_expiration: Date.now() + ONE_DAY
      }
    }, userFixture))
  },

  with_expired_password_reset_token() {
    return User.create(_.merge({
      local_data: {
        password_reset_token: '123',
        password_reset_expiration: Date.now() - ONE_DAY
      }
    }, userFixture))
  },
}
