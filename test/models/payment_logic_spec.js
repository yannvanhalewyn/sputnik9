var include   = require('include')
  , chai      = require('chai')
  , sinon     = require('sinon')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , Q         = require('q')
  , Immutable = require('immutable')
chai.use(sinonChai);

var paymentLogic = include('/src/models/payment_logic')
  , paymentGateway = include('/src/models/payment_gateway')
  , paymentFixture = Immutable.fromJS(require('../fixtures/payments'))
  , Payment = include('/src/models/payment')
  , User = include('/src/models/user')
  , userFixture = Immutable.fromJS(require('../fixtures/user'))

var db = require('../util/test_db');
db.connect();
afterEach(db.teardown);

describe('paymentLogic', function() {

  /*
   * ===============
   * payForPremium()
   * ===============
   */
  describe('payForPremium', function() {

    var USER;
    beforeEach(function() {
      return User.create(userFixture.toJS()).then(function(user) {
        USER = user;
      });
    });

    it("calls the payment gateway with the correct params", function() {
      paymentGateway.create = mollieCreatedPaymentMock();
      return paymentLogic.payForPremium(USER, "sputnik9.nl")
      .then(function(payment) {
        var expected = paymentFixture.get("creation_request").toJS()
        expected.metadata = {user_id: USER._id, seriousRequest: true};
        expect(paymentGateway.create).to.have.been.calledWith(expected);
      })
    });

    it("creates a new payment in the database based on gateway response", function() {
    });

    it("stores the payment id in the users payments array", function() {
      paymentGateway.create = mollieCreatedPaymentMock();
      return paymentLogic.payForPremium(USER).then(function(payment) {
        return User.findById(USER._id).then(function(user) {
          expect(user.payments.length).to.eql(1)
          expect(user.payments[0]).to.eql(payment._id)
        })
      })
    });
  }); // End of describe 'payForPremium'

/*
 * ======
 * resync
 * ======
 */
  describe('resync', function() {

    context("when open payment goes to paid", function() {
      beforeEach(function() {
        return setupResync("open")
      });

      it("persists the updated changes", function() {
        return paymentLogic.resync("abcde").then(function() {
          return Payment.findOne({mollie_id: "abcde"})
          .then(function(payment) {
            expect(payment.status).to.eql("paid")
          })
        });
      });

      it("stores the user as premium", function() {
        return paymentLogic.resync("abcde").then(function() {
          return User.findOne({}).then(function(user) {
            expect(user.premium).to.be.true;
          })
        })
      });
    }); // End of context 'when open payment goes to paid'

    context("when paid payment goes to refunded", function() {
      beforeEach(function() {
        return setupResync("paid", "refunded")
      });

      it("stores the user as not premium", function() {
        return paymentLogic.resync("abcde").then(function(payment) {
          return User.findOne({}).then(function(user) {
            expect(user.premium).to.eql(false)
          })
        })
      });
    }); // End of context 'when paid payment goes to refunded'

    context("when paid payment gets cancelled", function() {
      beforeEach(function() {
        return setupResync("open", "cancelled")
      });

      it("stores the user as not premium", function() {
        return paymentLogic.resync("abcde").then(function(payment) {
          return User.findOne({}).then(function(user) {
            expect(user.premium).to.eql(false)
          })
        })
      });
    }); // End of context 'when paid payment goes to refunded'
  }); // End of describe 'resync'
}); // End of describe 'paymentLogic'

function rejectedPromise() {
  var defered = Q.defer();
  defered.reject('error')
  return defered.promise
}

function mollieCreatedPaymentMock() {
  return sinon.stub().returns(Q(
    paymentFixture.get("createdPayment").toJS()
  ))
}

function molliePaidPaymentMock(mollie_id) {
  var payment = paymentFixture.get("paidPayment").toJS()
  if (mollie_id) payment.id = mollie_id
  return sinon.stub().returns(Q(payment))
}

function mollieRefundedPaymentMock(mollie_id) {
  var payment = paymentFixture.get("refundedPayment").toJS()
  if (mollie_id) payment.id = mollie_id
  return sinon.stub().returns(Q(payment))
}

function mollieCancelledPaymentMock(mollie_id) {
  var payment = paymentFixture.get("cancelledPayment").toJS()
  if (mollie_id) payment.id = mollie_id
  return sinon.stub().returns(Q(payment))
}

STATUS_TO_MOCK = {
  "paid": molliePaidPaymentMock,
  "refunded": mollieRefundedPaymentMock,
  "cancelled": mollieCancelledPaymentMock
}

function setupResync(original_status, resync_status) {
  // Create a payement
  return Payment.create({mollie_id: "abcde", status: original_status})
  .then(function(payment) {

    // Have "syncWithMollie" return a payment obj with valid _id
    paymentGateway.get = STATUS_TO_MOCK[resync_status || "paid"]("abcde")

    // Create a user with the payment in it's array
    var userData = userFixture.set("payments", [payment._id]).toJS()
    if (original_status == "paid") userData.premium = true;
    return User.create(userData)
  })
}
