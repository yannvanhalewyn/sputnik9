require('../spec_helper')
var userCrypto = include('src/lib/user_crypto');

describe('user crypto', () => {

  describe('.expiringToken', () => {
    var token
    beforeEach(() => userCrypto.expiringToken().then(t => token = t))

    it('generates a random 48 chars hex token', () => {
      token.data.should.match(/^[0-9a-f]{48}$/)
    });

    it('expires a day from now', () => {
      token.expires.should.be.closeTo(Date.now() + 24 * 3600 * 1000, 1000)
    });
  }); // End of describe '.expiringToken'

  describe('.hashPassword', () => {
    it('returns a bcrypt hash that is verifiable', function() {
      return userCrypto.hashPassword('password').then(hash => {
        hash.should.not.be.undefined
        hash.should.satisfy(hash => bcrypt.compareSync('password', hash))
      })
    });
  })
}); // End of describe 'user crypto'
