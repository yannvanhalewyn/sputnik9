var include = require('include')
  , chai      = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , chaiAsPromised = require('chai-as-promised')
  , expect    = chai.expect
  , Q = require('q')
  , Immutable = require('immutable')
chai.use(sinonChai);
chai.use(chaiAsPromised);

var Payment = include('/src/models/payment')
  , db = require('../util/test_db')
  , paymentGateway = include('/src/models/payment_gateway')
  , paymentFixtures = Immutable.fromJS(require('../fixtures/payments'))

db.connect();
afterEach(db.teardown);

describe('Payment model', function() {


  describe('syncWithMollie', function() {

    var PAYMENT_DB;

    beforeEach(function() {
      return setupSyncWithMollie().then(function(payment) {
        PAYMENT_DB = payment;
      })
    });

    it("calls the mollie api to get new info on payment", function() {
      return Payment.syncWithMollie("abcdef").then(function() {
        expect(paymentGateway.get).to.have.been.calledWith("abcdef");
      });
    });

    it("persists that new info", function() {
      return Payment.syncWithMollie("abcdef").then(function() {
        return Payment.findById(PAYMENT_DB._id).then(function(newPayment) {
          expect(newPayment.status).to.eql('paid');
        })
      });
    });

    it("returns the payment object", function() {
      return Payment.syncWithMollie("abcdef").then(function(ret) {
        expect(ret.id).to.eql("abcdef")
        expect(ret.status).to.eql("paid")
      })
    });

    context("when the payment does not exist in our db", function() {
      it("returns a rejected promise", function() {
        var promise = Payment.syncWithMollie("invalid_id");
        return expect(promise).to.be.rejectedWith("No such payment in our database: invalid_id")
      });
    }); // End of context 'when the payment does not exist in our db'
  }); // End of describe 'syncWithMollie'

}); // End of describe 'Payment model'

function setupSyncWithMollie() {
  // create a random payment
  return Payment.create({mollie_id: "abcdef", amount: 10, status: 'open'})
  .then(function(payment) {

    // stub the return value of paymentgateway.get
    paymentGateway.get = sinon.stub().returns(Q(
      paymentFixtures.get('paidPayment').set('id', "abcdef").toJS()
    ));

    return payment

  });
}
