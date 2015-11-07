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
      var promise = new User(userFixture.toJS()).save()
      return expect(promise).to.be.fulfilled;
    });

    it("validates the presence of the first_name", function() {
      var promise = new User(userFixture.delete("first_name").toJS()).save();
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the first_name", function() {
      var promise = new User(userFixture.set("first_name", "ab").toJS()).save();
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the last_name", function() {
      var promise = new User(userFixture.delete("last_name").toJS()).save();
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the last_name", function() {
      var promise = new User(userFixture.set("last_name", "12").toJS()).save()
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the email", function() {
      var promise = new User(userFixture.delete("email").toJS()).save();
      return expect(promise).to.be.rejected;
    });

    it("validates the email address", function() {
      var promise = new User(userFixture.set("email", "not@email").toJS()).save()
      return expect(promise).to.be.rejected;
    });

    it("checks for a unique email address", function() {
      var promise = new User(userFixture.toJS()).save()
      .then(function(user) {
        return new User(userFixture.toJS()).save();
      })
      return expect(promise).to.be.rejected;
    });
  }); // End of describe 'creation'

}); // End of describe 'User'
