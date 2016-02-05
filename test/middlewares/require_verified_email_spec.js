require('../spec_helper')
var requireVerifiedEmail = include('/src/middlewares/require_verified_email')

describe('require verified email middleware', function() {
  var req, res, next;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  context("when a user is set on the req object", function() {
    beforeEach(function() {
      req.user = {}
    });

    context("when the user is verified", function() {
      it("calls next", function() {
        req.user = verifiedUser();
        requireVerifiedEmail(req, res, next);
        expect(next).to.have.been.called;
      });
    }); // End of context 'when the user is verified'

    context("when the user is not authenticated via email and pass", function() {
      it("calls next", function() {
        req.user = unlocalUser();
        requireVerifiedEmail(req, res, next);
        expect(next).to.have.been.called;
      });
    }); // End of context 'when the user is not authenticated via email and pass'

    context("when the user is not verified", function() {
      beforeEach(function() {
        req.user = unverifiedUser();
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

function verifiedUser() {
  return {
    provider: 'local',
    local_data: {
      verified: true
    }
  }
}

function unverifiedUser() {
  var v = verifiedUser();
  v.local_data.verified = false;
  return v;
}

function unlocalUser() {
  return {
    provider: 'facebook'
  }
}
