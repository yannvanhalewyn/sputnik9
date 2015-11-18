var include   = require('include')
  , chai      = require('chai')
  , sinon     = require('sinon')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , Q         = require('q')
  , Immutable = require('immutable')
chai.use(sinonChai);

var paymentLogic = include('/src/models/payment_logic')
  , payment_gateway = include('/src/models/payment_gateway')
  , paymentFixture = Immutable.fromJS(require('../fixtures/payments'))
  , Payment = include('/src/models/payment')
  , User = include('/src/models/user')
  , userFixture = require('../fixtures/user')

var db = require('../util/test_db');
db.connect();
afterEach(db.teardown);

describe('paymentLogic', function() {

  describe('payForPremium', function() {

    var USER;
    beforeEach(function() {
      return User.create(userFixture).then(function(user) {
        USER = user;
      });
    });

    it("calls the payment gateway with the correct params", function() {
      payment_gateway.create = sinon.stub().returns(Q(
        paymentFixture.get("createdPayment").toJS()
      ))
      return paymentLogic.payForPremium(USER, "http://www.sputnik9.nl").then(function(payment) {
        var expected = paymentFixture.get("creation_request").toJS()
        expected.metadata = {user_id: USER._id};
        expect(payment_gateway.create).to.have.been.calledWith(expected);
      })
    });

    it("creates a new payment in the database based on gateway response", function() {
    });

    it("stores the payment id in the users payments array", function() {
      payment_gateway.create = sinon.stub().returns(Q(
        paymentFixture.get("createdPayment").toJS()
      ));
      return paymentLogic.payForPremium(USER).then(function(payment) {
        return User.findById(USER._id).then(function(user) {
          expect(user.payments.length).to.eql(1)
          expect(user.payments[0]).to.eql(payment._id)
        })
      })
    });

  }); // End of describe 'payForPremium'
}); // End of describe 'paymentLogic'

function rejectedPromise() {
  var defered = Q.defer();
  defered.reject('error')
  return defered.promise
}


