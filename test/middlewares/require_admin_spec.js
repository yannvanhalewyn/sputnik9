var include   = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , sinon     = require('sinon')
  , reqres    = require('reqres')
chai.use(sinonChai);

var requireAdmin = include('src/middlewares/require_admin');

describe('requireLogin', function() {

  var req, res;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
  });

  context("when the req object has a user", function() {
    it("calls next if admin", function() {
      req.user = {admin: true};
      next = sinon.spy();
      requireAdmin(req, res, next);
      expect(next).to.have.been.called;
    });

    context('When the user is not an admin', function() {
      var next;
      beforeEach(function() {
        req.user = {admin: false};
        next = sinon.spy();
        requireAdmin(req, res, next);
      });

      it('redirects to /login', function() {
        expect(res.redirect).to.have.been.calledWith('/login');
      });

      it('doesn\'t call next', function() {
        expect(next).not.to.have.been.called;
      })
    }); // End of context 'When the user is not an admin'
  }); // End of context 'when the req object has a user'

  context("when the req object has no user", function() {
    var next;
    beforeEach(function() {
      req.user = undefined;
      next = sinon.spy();
      requireAdmin(req, res, next);
    });

    it("doesn't call next", function() {
      expect(next).not.to.have.been.called;
    });

    it("redirects to the login page", function() {
      expect(res.redirect).to.have.been.calledWith("/login");
    });

    it("set's the flash error message", function() {
      expect(req.session.flash).to.eql({type: "error", message: "You must be logged in to view that page."})
    });

  }); // End of context 'when the req object has no user'

}); // End of describe ''
