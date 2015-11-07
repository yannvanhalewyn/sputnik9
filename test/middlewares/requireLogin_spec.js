var include   = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , sinon     = require('sinon')
  , reqres    = require('reqres')
  , Q         = require('q')
chai.use(sinonChai);

var requireLogin = include('src/middlewares/requireLogin');

describe('requireLogin', function() {

  var req, res;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
  });

  context("when the req object has a user", function() {
    it("calls next", function() {
      req.user = {dummyUser: true};
      next = sinon.spy();
      requireLogin(req, res, next);
      expect(next).to.have.been.called;
    });
  }); // End of context 'when the req object has a user'

  context("when the req object has no user", function() {

    var next;

    beforeEach(function() {
      req.user = undefined;
      next = sinon.spy();
      requireLogin(req, res, next);
    });

    it("doesn't call next", function() {
      expect(next).not.to.have.been.called;
    });

    it("redirects to the login page", function() {
      expect(res.render).to.have.been.calledWith("login", {
        error: "You must be logged in to view that page."
      });
    });

  }); // End of context 'when the req object has no user'

}); // End of describe ''
