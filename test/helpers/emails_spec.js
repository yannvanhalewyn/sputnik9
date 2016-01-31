var include   = require('include')
  , chai      = require('chai')
  , expect    = chai.expect

var emails = include('/src/helpers/emails');
var userFixture = include('/test/fixtures/user')

describe('emails', function() {
  describe('confirmation email', function() {
    it("returns an object with the correct values", function(done) {
      emails.emailConfirmation(userFixture).then(function(output) {
        expect(output.to).to.eql("j.d@gmail.com");
        expect(output.subject).to.eql("Please activate your account.");
        expect(output.html).not.to.be.undefined; // TODO
        done();
      }).catch(done);
    });
  }); // End of describe 'confirmation email'
}); // End of describe 'emails'
