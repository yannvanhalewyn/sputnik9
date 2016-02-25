require('../spec_helper')
var paywall = include('/src/middlewares/paywall')

describe('require_paid middleware', function() {

  var req, res, next;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  context("when logged in user is a premium user", function() {
    beforeEach(function() {
      req.user = {premium: true}
    });

    it("calls next", function() {
      paywall(req, res, next);
      expect(next).to.have.been.calledWithExactly();
    });
  }); // End of context 'when the user has paid for this month'

  context("when logged in user is not a premium user", function() {
    it("calls next with an error", function() {
      req.user = {premium: false, _id: "theid"}
      paywall(req, res, next);
      expect(next).to.have.been.calledWith("User 'theid' is not a premium user.");
    });
  }); // End of context 'when logged in user is not a premium user'
}); // End of describe 'require_paid middleware'
