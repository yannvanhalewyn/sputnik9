var include   = require('include')
  , chai      = require('chai')
  , expect = chai.expect
  , UnlockCode = include('src/models/unlock_code')
  , Factory = require('../factories/factory')
  , db = require('../util/test_db')

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

}); // End of describe 'UnlockCode'
