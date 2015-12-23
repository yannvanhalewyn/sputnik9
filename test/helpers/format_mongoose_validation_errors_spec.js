var include   = require('include')
  , chai      = require('chai')
  // , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  // , sinon     = require('sinon')
// chai.use(sinonChai);


var formatValidationErrors = include("/src/helpers/format_mongoose_validation_errors.js");
errorFixture = require("../fixtures/mongoose_validation_errors")

describe.skip('format mongoose validation errors', function() {

  context("when it's a mongo duplication error", function() {
    it("returns an email property with the correct message", function() {
      var res = formatValidationErrors({code: 11000});
      expect(res.email).not.to.be.undefined;
      expect(res.email).to.eql("This email has already been registered.");
    });
  }); // End of context 'when it's a mongo duplication error'

  context("when it's an actual validator error", function() {
    var res;

    before(function() {
      res = formatValidationErrors(errorFixture);
    });

    it("formats the correct error when a field is required", function() {
      expect(res.first_name).not.to.be.undefined;
      expect(res.first_name).to.eql("should not be empty.");
    });

    it("formats the correct error when a field is too short", function() {
      expect(res.last_name).not.to.be.undefined;
      expect(res.last_name).to.eql("is too short.");
    });

    it("formats the correct error when a field fails a regex", function() {
      expect(res.email).to.not.to.be.undefined;
      expect(res.email).to.eql("is invalid.");
    });
  }); // End of context 'when it's an actual validator error'


}); // End of describe 'format mongoose validation errors'
