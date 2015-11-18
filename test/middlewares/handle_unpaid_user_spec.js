// TODO not secure at all, needs work after user.verifyPayments is implemented
var include = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , reqres = require('reqres')
  , sinon = require('sinon')
  , Q = require('q')
chai.use(sinonChai);

var handle_unpaid_user = include("/src/middlewares/handle_unpaid_user")

describe('handle_unpaid_user middleware', function() {

  var req, res;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
  });

  context("when user has no open payments", function() {
    it("renders the unpaid template", function() {
      req.user = {
        payments: []
      }
      handle_unpaid_user("user is not premium", req, res, null);
      expect(res.render).to.have.been.calledOnce;
      expect(res.render).to.have.been.calledWith("prompt-payment");
    });
  }); // End of context 'when user has no open payments'

  context("when user has open payments", function() {
    beforeEach(function() {
      req.user = {
        payments: ["paymentid1", "paymentid2"]
      }
    });

    it("calls verify payments on user object", function() {
      req.user.verifyPayments = sinon.stub().returns(Q())
      handle_unpaid_user("user is not premium", req, res, null);
      expect(req.user.verifyPayments).to.have.been.called;
    });

    context("when after verifying payments it appears the user is premium", function() {
      it("renders the premium page", function(done) {
        req.user.verifyPayments = sinon.stub().returns(Q(true))
        handle_unpaid_user("user is not premium", req, res, null);
        res.on('end', function() {
          expect(res.render).to.have.been.calledOnce;
          expect(res.render).to.have.been.calledWith("media");
          done();
        })
      });
    }); // End of context 'when after verifying payments it appears the user is premium'

  }); // End of context 'when user has open payments'

  it("", function() {

  });

}); // End of describe 'handle_unpaid_user middleware'
