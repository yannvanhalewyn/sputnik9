require('../spec_helper')
var verify = include('/src/helpers/verify_user_password')
  , User = include('/src/models/user')
  , userFixture = require('../fixtures/user')

describe('verify user password helper', function() {

  context("when a user exists", function() {

    var USER;
    beforeEach(() => Factory('user').then(u => USER = u));

    context("when verify receives the correct password", function() {
      it("resolves to true and the user object", done => {
        return verify("j.d@gmail.com", "password").then(user => {
          expect(user._id).to.eql(USER._id)
          done();
        }, done);
      });
    }); // End of context 'when verify receaves the correct password'

    context("when verify receives the wrong password", function() {
      it("returns a resolving promise with a false value", function() {
        var promise = verify("j.d@gmail.com", "wrongpassword");
        return expect(promise).to.become(false);
      });
    }); // End of context 'when verify receives the wrong password'
  }); // End of context 'when a user exists'

  context("when a user doesn't exist", function() {
    it("returns a resolving promise with a false value", function() {
      var promise = verify("nouser@foobar.nl", "wrongpassword");
      return expect(promise).to.become(false);
    });
  }); // End of context 'when a user doesn't exist'

}); // End of describe 'verify user password helper'
