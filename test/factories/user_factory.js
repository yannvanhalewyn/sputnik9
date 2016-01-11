var User = require('../../src/models/user')
  , userFixture = require('../fixtures/user')

module.exports = {
  default() {
    return User.create(userFixture)
  }
}
