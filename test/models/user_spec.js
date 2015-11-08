var include   = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect    = chai.expect
  , sinon     = require('sinon')
  , reqres    = require('reqres')
  , Q         = require('q')
  , Immutable = require('immutable')
chai.use(sinonChai);
chai.use(chaiAsPromised);

var test_db = require("../util/test_db")
  , User = include('/src/models/user')
  , userFixture = Immutable.fromJS(require('../fixtures/user'));

before(function() {
  return test_db.connect();
})

afterEach(function() {
  test_db.teardown();
});

describe('User', function() {

  describe('creation', function() {

    it("works with valid fields", function() {
      var promise = User.create(userFixture.toJS())
      return expect(promise).to.be.fulfilled;
    });

    it("validates the presence of the first_name", function() {
      var promise = User.create(userFixture.delete("first_name").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the first_name", function() {
      var promise = User.create(userFixture.set("first_name", "ab").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the last_name", function() {
      var promise = User.create(userFixture.delete("last_name").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the last_name", function() {
      var promise = User.create(userFixture.set("last_name", "12").toJS())
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the email", function() {
      var promise = User.create(userFixture.delete("email").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the email address", function() {
      var promise = User.create(userFixture.set("email", "not@email").toJS())
      return expect(promise).to.be.rejected;
    });

    it("checks for a unique email address", function() {
      var promise = User.create(userFixture.toJS())
      .then(function(user) {
        return User.create(userFixture.toJS());
      })
      return expect(promise).to.be.rejected;
    });

    it("creates a random 48 chars hex token for email confirmation with expiration date", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        var token = user.confirmation_token;
        var expiration = Date.now() + 24 * 3600 * 1000;
        expect(token).not.to.be.undefined;
        expect(token).to.match(/^[0-9a-f]{48}$/)
        expect(user.token_expiration).to.be.within(expiration - 1000, expiration + 1000);
      });
    });
  }); // End of describe 'creation'

}); // End of describe 'User'
