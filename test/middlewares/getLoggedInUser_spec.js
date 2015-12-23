var include   = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , sinon     = require('sinon')
  , reqres    = require('reqres')
  , Q         = require('q')
chai.use(sinonChai);

var User = include("src/models/user")
  , userFixture = require("../fixtures/user")
  , db = require("../util/test_db")
before(db.connect)
afterEach(db.teardown)

var getLoggedInUser = include('src/middlewares/getLoggedInUser');

describe('getLoggedInUser', function() {

  var req, res, next;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  // TMP
  afterEach(function() {
    return User.remove({});
  });

  context("When session has a user_id", function() {
    context("When user actually exists", function() {

      var USER;

      beforeEach(function() {
        return User.create(userFixture).then(function(user) {
          USER = user;
          req.session = {user_id: user._id}
          return getLoggedInUser(req, res, next);
        });
      });

      it("calls next", function() {
        expect(next).to.have.been.called;
      });

      it("stores the correct user as req.user", function() {
        expect(req.user._id).to.eql(USER._id)
      });

    })

    context("when user doesn't exist", function() {
      beforeEach(function() {
        req.session.user_id = "0123456789abcdef01234567";
        return getLoggedInUser(req, res, next);
      });

      it("calls next", function() {
        expect(next).to.have.been.called;
      });

      it("doesn't store a req.user object", function() {
        expect(req.user).to.be.null;
      });
    }); // End of context 'when user doesn't exist'
  }); // End of context 'When session has a user_id'

  context("when session has no user_id", function() {
    beforeEach(function() {
      getLoggedInUser(req, res, next);
    });

    it("calls next", function() {
      expect(next).to.have.been.called;
    });

    it("doesn't set a req.user object", function() {
      expect(req.user).to.be.null;
    });
  }); // End of context 'when session has no user_id'

}); // End of describe 'getLoggedInUser'
