var User = require('../../src/models/user')
  , userFixture = require('../fixtures/user')
  , _ = require('lodash')

module.exports = {
  default(params) {
    return User.create(_.merge({}, userFixture, params))
  },

  subscribed() {
    return User.create(_.merge({receive_emails: true}, userFixture))
  },

  unsubscribed() {
    return User.create(_.merge({receive_emails: false}, userFixture))
  }
}
