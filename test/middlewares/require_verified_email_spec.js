var include = require('include')
  , chai = require('chai')
  , sinonChai = require('sinon-chai')
  , sinon = require('sinon')
  , expect = chai.expect
  , reqres = require('reqres')
chai.use(sinonChai);

var requireVerifiedEmail = include('/src/middlewares/require_verified_email');

describe('require verified email middleware', function() {
  var req, res, next;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  context("when no user is set on the req object", function() {
    it("renders the 'please verify email' page", function() {
      req.user = {verified: false}
      requireVerifiedEmail(req, res, next);
      expect(res.render).to.have.been.calledWith('please_verify_email');
    });

    it("doesn't call next", function() {
      expect(next).not.to.have.been.called;
    });
  }); // End of context 'when no user is set on the req object'

  context("when a user is set on the req object", function() {
    beforeEach(function() {
      req.user = {}
    });

    context("when the user is verified", function() {
      it("calls next", function() {
        req.user.verified = true;
        requireVerifiedEmail(req, res, next);
        expect(next).to.have.been.called;
      });
    }); // End of context 'when the user is verified'

    context("when the user is not verified", function() {
      beforeEach(function() {
        req.user.verified = false;
        requireVerifiedEmail(req, res, next);
      });

      it("doesn't call next", function() {
        expect(next).not.to.have.been.called;
      });

      it("sends a message", function() {
        expect(res.render).to.have.been.calledWith("please_verify_email");
      });
    }); // End of context 'when the user is not verified'

  }); // End of context 'when a user is set on the req object'
}); // End of describe 'require verified email middleware'
