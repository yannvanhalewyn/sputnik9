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
  , userFixture = Immutable.fromJS(require('../fixtures/user'))
  , userFixtureFB = Immutable.fromJS(require('../fixtures/user_fb'));

before(test_db.connect);
afterEach(test_db.teardown);

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

    it.skip("checks for a unique email address", function() {
      var promise = User.create(userFixture.toJS())
      .then(function(user) {
        return User.create(userFixture.toJS());
      })
      return expect(promise).to.be.rejected;
    });

    it("creates a random 48 chars hex token for email confirmation with expiration date", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        var token = user.local_data.confirmation_token;
        var expiration = Date.now() + 24 * 3600 * 1000;
        expect(token).not.to.be.undefined;
        expect(token).to.match(/^[0-9a-f]{48}$/)
        expect(user.local_data.token_expiration).to.be.within(expiration - 1000, expiration + 1000);
      });
    });

    it("sets the verified flag to false", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        expect(user.local_data.verified).to.be.falsey;
      })
    });

    it("sets the premium flag to false", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.premium).to.be.falsey;
      })
    });
  }); // End of describe 'creation'

  describe('verification', function() {
    context("with a valid authentication token", function() {

      context("when token is not expired", function() {
        var USER;
        beforeEach(function(done) {
          return User.create(userFixture.toJS()).then(function(user) {
            console.log(user.local_data.token_expiration);
            return User.verify(user.local_data.confirmation_token).then(function(user) {
              USER = user;
              done();
            });
          }).catch(done);
        });

        it("sets the verified flag to true", function() {
          expect(USER.local_data.verified).to.be.true;
        });

        it("destroys the old token and expiration", function() {
          expect(USER.local_data.confirmation_token).to.be.null;
          expect(USER.local_data.token_expiration).to.be.null;
        });
      }); // End of context 'when token is not expired'

      context("when token is expired", function() {
        it("returns a rejected promise", function() {
          return User.create(userFixture.toJS()).then(function(user) {
            user.local_data.token_expiration = Date.now() - 2000;
            return user.save().then(function(response) {
              var promise = User.verify(user.local_data.confirmation_token);
              return expect(promise).to.be.rejectedWith("This token has been expired.");
            })
          });
        });
      }); // End of context 'when token is expired'
    }); // End of context 'with a valid authentication token'

    context("with an invalid token", function() {
      it("returns a rejected promise", function() {
        var promise = User.verify("WRONG");
        return expect(promise).to.be.rejectedWith("No user found with token WRONG");
      });
    }); // End of context 'with an invalid token'
  }); // End of describe 'verification'

  describe('facebook_creation', function() {
    it("works", function() {
      expect(User.create(userFixtureFB.toJS())).to.be.fulfilled;
    });

    it("stores the provider name and provider_data", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.provider).to.eql('facebook');
        expect(user.fb_data.id).to.eql('123');
        expect(user.fb_data.accessToken).to.eql('theaccesstoken');
      })
    })

    it("Defaults the premium flag to false", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.premium).to.be.falsey;
      })
    });
  }); // End of describe 'facebook_creation'

  describe('addPayment', function() {
    it("adds the payment to that user's payments array", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        return user.addPayment({_id: "012345678901234567891234"}).then(function(user) {
          expect(user.payments.length).to.eq(1);
          expect(user.payments[0].toString()).to.equal("012345678901234567891234")
        })
      })
    });
  }); // End of describe 'addPayment'
}); // End of describe 'User'
