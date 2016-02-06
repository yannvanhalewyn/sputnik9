require('../spec_helper')
var password = include('src/lib/password')

describe('password', () => {
  describe('.reset', () => {
    var user;
    beforeEach(() => {
      return Factory('user').then(password.setResetToken).then(u => user = u)
    });

    it('stores a password reset token that expires tomorrow', () => {
      console.log(user.local_data.password_reset_expiration);
      user.local_data.password_reset_token.should.not.be.undefined
      user.local_data.password_reset_token.should.match(/^[0-9a-f]{48}$/)
      user.local_data.password_reset_expiration.getTime().should.be
        .closeTo(Date.now() + 24 * 3600 * 1000, 1000)
    });
  }); // End of describe '.reset'
}); // End of describe 'password'
