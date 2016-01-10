var include   = require('include')
  , chai      = require('chai')
  , expect = chai.expect
  , UnlockCode = include('src/models/unlock_code')
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

}); // End of describe 'UnlockCode'
