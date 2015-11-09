var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect = chai.expect
  , include = require('include')
  , verify = include('/src/helpers/verify_user_password')
  , User = include('/src/models/user')
  , userFixture = require('../fixtures/user')
  , bcrypt = require('bcrypt')
chai.use(chaiAsPromised);

// Setup test_db
var db = require('../util/test_db')
db.connect();
afterEach(db.teardown)

describe('verify user password helper', function() {

  context("when a user exists", function() {

    var USER;

    beforeEach(function(done) {
      bcrypt.hash("password123", 10, function(err, hash) {
        userFixture.password_digest = hash;
        User.create(userFixture).then(function(user) {
          USER = user;
          done();
        }).catch(done);
      });
    });

    context("when verify receives the correct password", function() {
      it("resolves to true and the user object", function(done) {
        return verify("j.d@gmail.com", "password123")
        .then(function(user) {
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
