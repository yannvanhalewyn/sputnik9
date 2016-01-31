var include        = require('include')
  , chai           = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect         = chai.expect
  , Factory        = require('../factories/factory')
  , unsubscribe    = include('src/lib/unsubscribe')
  , User           = include('src/models/user')
chai.use(chaiAsPromised)

var db = require('../util/test_db');

before(db.connect)
afterEach(db.teardown)

describe('unsubscriber', function() {
  context('when the user id exists', function() {
    context('when the user is subscribed', function() {

      var USER;
      beforeEach(function() {
        return Factory('user', 'subscribed').then((u) => USER = u)
      });

      it('sets the receive_emails flag to false', function() {
        return unsubscribe(USER._id).then(() => {
          return User.findById(USER._id).then((user) => {
            return expect(user.receive_emails).to.be.false;
          })
        })
      });

      it('resolves the promise', function() {
        return expect(unsubscribe(USER._id)).to.eventually.be.fulfilled;
      });
    }); // End of context 'when the user is subscribed'

    context('when the users is not subscribed', function() {

      var promise;
      beforeEach(function() {
        return Factory('user', 'unsubscribed').then((user) => {
          promise = unsubscribe(user._id)
        })
      });

      it('rejects the promise with an error', function() {
        return expect(promise).to.eventually.be
          .rejectedWith('Je was al afgemeld van de nieuwsmeldingen.')
      });
    }); // End of context 'when the users is not subscribed'
  }); // End of context 'when the user id exists'

  context('when the user id doesnt exists', function() {
    it('rejects the error with a promise', function() {
      return expect(unsubscribe('123456789012345678901234')).to
        .eventually.be.rejectedWith('Ongeldige gebruikers ID.')
    });
  }); // End of context 'when the user id doesnt exists'
}); // End of describe 'unsubscriber'
