var User = require('../../src/models/user')
  , userFixture = require('../fixtures/user')
  , _ = require('lodash')

module.exports = {
  default() {
    return User.create(userFixture)
  },

  subscribed() {
    return User.create(_.merge({receive_emails: true}, userFixture))
  },

  unsubscribed() {
    return User.create(_.merge({receive_emails: false}, userFixture))
  }
}
