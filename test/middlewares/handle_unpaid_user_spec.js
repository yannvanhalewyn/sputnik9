// TODO not secure at all, needs work after user.verifyPayments is implemented
var include = require('include')
  , chai      = require('chai')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , reqres = require('reqres')
  , sinon = require('sinon')
  , Q = require('q')
chai.use(sinonChai);

var handleUnpaid = include("/src/middlewares/handle_unpaid_user")
  , db = require('../util/test_db')
  , User = include('/src/models/user')
  , userFixture = require('../fixtures/user')
  , Payment = include('/src/models/payment')
before(db.connect);
afterEach(db.teardown);

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
      handleUnpaid("is not premium", req, res, null);
      expect(res.render).to.have.been.calledOnce;
      expect(res.render).to.have.been.calledWith("prompt-payment");
    });
  }); // End of context 'when user has no open payments'

  context("when user has open payments", function() {
    var USER;
    beforeEach(function() {
      return User.create(userFixture).then(function(user) {
        USER = user;
      })
    });


    it("prompts for payment when user has no cleared payments", function(done) {
      return Payment.create({status: "open"}).then(function(payment) {
        return USER.addPayment(payment).then(function(user) {
          req.user = user;
          handleUnpaid("error", req, res)
          res.on('end', function() {
            expect(res.render).to.have.been.calledOnce;
            expect(res.render).to.have.been.calledWith("prompt-payment");
            done();
          }).catch(done)
        })
      });
    }); // End of context 'when open payments are unpaid'

    context("when user has paid payments", function() {
      it("sets the user's premium state to true and renders premium", function(done) {
        return Payment.create({status: "paid"}).then(function(payment) {
          return USER.addPayment(payment).then(function(user) {
            req.user = user;
            handleUnpaid("error", req, res)
            res.on('end', function() {
              expect(res.render).to.have.been.calledOnce;
              expect(res.render).to.have.been.calledWith("premium");
              return User.findById(USER._id).then(function(user) {
                expect(user.premium).to.eql(true)
                done();
              })
            }).catch(done)
          })
        });
      });
    }); // End of context 'when user has paid payments'

  }); // End of context 'when user has open payments'

}); // End of describe 'handle_unpaid_user middleware'
