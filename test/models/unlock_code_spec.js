var include    = require('include')
  , chai       = require('chai')
  , expect     = chai.expect
  , UnlockCode = include('src/models/unlock_code')
  , User       = include('src/models/user')
  , Factory    = require('../factories/factory')
  , db         = require('../util/test_db')

before(db.connect)
afterEach(db.teardown)

describe('UnlockCode', function() {

  describe('creation', function() {
    it('generates a random string of length 24', function() {
      return UnlockCode.create().then((uc) => {
        expect(uc.code).to.match(/^[0-9a-f]{24}$/)
      })
    });
  }); // End of describe 'creation'

  describe('#isValid', function() {
    it('returns true if code has not yet been used', function() {
      return Factory('unlock_code').then((uc) => {
        expect(uc.isValid()).to.be.false;
      })
    });

    it("returns true if the code has been used", function() {
      return Factory('unlock_code', 'used').then(uc => {
        expect(uc.isValid()).to.be.true;
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
  }); // End of describe '#use'

}); // End of describe 'UnlockCode'
