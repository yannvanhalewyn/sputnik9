var include        = require('include')
  , chai           = require('chai')
  , chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
  , expect         = chai.expect
  , UnlockCode     = include('src/models/unlock_code')
  , User           = include('src/models/user')
  , Factory        = require('../factories/factory')
  , db             = require('../util/test_db')

before(db.connect)
afterEach(db.teardown)

describe('UnlockCode', function() {

  describe('creation', function() {
    it('generates a random string of length 24', function() {
      return UnlockCode.create().then((uc) => {
        expect(uc.code).to.match(/^[0-9a-f]{24}$/)
      })
    });

    it('stores the sent_to if any', function() {
      return UnlockCode.create('john@doe.nl').then((uc) => {
        return expect(uc.sent_to).to.eq('john@doe.nl')
      })
    });
  }); // End of describe 'creation'

  describe('#isValid', function() {
    it('returns true if code has not yet been used', function() {
      return Factory('unlock_code').then((uc) => {
        expect(uc.isValid()).to.be.true;
      })
    });

    it("returns false if the code has been used", function() {
      return Factory('unlock_code', 'used').then(uc => {
        expect(uc.isValid()).to.be.false;
      })
    });
  }); // End of describe '#valid?'

  describe('#use', function() {
    context("when the code has not been used yet", function() {
      var USER, UC;
      before(function() {
        return Factory('unlock_code').then(uc => {
          return Factory('user').then(user => {
            return uc.use(user).then(result => {
              UC = result.unlock_code;
              USER = result.user;
            })
          })
        })
      });

      it("stores the user's _id as activated_by field", function() {
        expect(UC.activated_by).to.eql(USER._id)
      });

      it("sets the user as premium", function() {
        expect(USER.premium).to.be.true;
      });
    }); // End of context 'when the code has not been used yet'

    context("when the code has already been used", function() {
      var UC, USER;
      beforeEach(function() {
        return Factory('unlock_code', 'used').then(uc => {
          return Factory('user').then(user => {
            UC = uc;
            USER = user;
          })
        })
      });

      it("rejects the promise with an error message", function() {
        return expect(UC.use(USER)).to.be
          .rejectedWith("This unlock code has already been used.")
      });

      it("doesn't set the user as premium", function(done) {
        return UC.use(USER).then(
          done,
          () => {
            return User.findById(USER._id).then(user => {
              expect(user.premium).not.to.be.ok;
              done();
            })
          }
        ).catch(done)
      });

      it("doesn't overwrite the unlockcode's previous owner_id", function(done) {
        return UC.use(USER).then(
          done,
          () => {
            return UnlockCode.findById(UC._id).then(uc => {
              expect(uc.activated_by).to.eql(UC.activated_by)
              done();
            })
          }
        ).catch(done)
      });
    }); // End of context 'when the code has already been used'
  }); // End of describe '#use'

}); // End of describe 'UnlockCode'
