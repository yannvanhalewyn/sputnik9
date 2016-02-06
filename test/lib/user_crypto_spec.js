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
}); // End of describe 'user crypto'
