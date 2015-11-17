var include = require('include')
  , chai      = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , expect    = chai.expect
  , Q = require('q')
chai.use(sinonChai);

var Payment = include('/src/models/payment')
  , db = require('../util/test_db')
  , paymentGateway = include('/src/models/payment_gateway')
  , paymentFixtures = require('../fixtures/payments')

db.connect();
afterEach(function() {
  db.teardown();
});

describe('Payment model', function() {

  describe('syncWithMollie', function() {
    it("calls the mollie api to get new info on payment", function() {
      paymentGateway.get = sinon.stub().returns(Q("foobar"))
      return Payment.syncWithMollie("abcdef").then(function() {
        expect(paymentGateway.get).to.have.been.calledWith("abcdef");
      });
    });

    it("persists that new info", function(done) {
      // Create a random payment
      Payment.create({mollie_id: "abcdef", amount: 10, status: 'open'})
      .then(function(payment) {

        // Stub the return value of paymentGateway.get
        paymentFixtures.requestedPayment.id = "abcdef";
        paymentGateway.get = sinon.stub().returns(Q(paymentFixtures.requestedPayment));

        // Sync with mollie (will use fake gateway)
        Payment.syncWithMollie("abcdef").then(function() {

          // Find that payment in the db and verify it's now paid
          Payment.findById(payment._id).then(function(newPayment) {
            expect(newPayment.status).to.eql('paid');
            done();
          })
        });
      });
    });
  }); // End of describe 'syncWithMollie'

}); // End of describe 'Payment model'
