var include        = require('include')
  , chai           = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , sinonChai      = require('sinon-chai')
  , Q              = require('q')
  , Factory        = require('../factories/factory')
  , sinon          = require('sinon')
  , mailer         = include('src/lib/mailer')
  , db             = require('../util/test_db')
  , notify         = include('src/lib/notify')
  , SentEmail = include('src/models/sent_email')
chai.should()
chai.use(chaiAsPromised);
chai.use(sinonChai);

before(db.connect)
afterEach(db.teardown);

describe('email notifier', () => {
  beforeEach(() => {
    sinon.stub(mailer, 'send')
  });

  afterEach(() => {
    mailer.send.restore()
  });

  describe('payment_confirmation', () => {
    context('when the user has not yet received a payment', () => {
      var user;

      beforeEach(() => {
        return Factory('user').then(u => {
          user = u
          return notify.payment_confirmation(u)
        })
      });

      it('sends the user the confirmatin email', () => {
        var params = mailer.send.firstCall.args[0]
        params.to.should.eql('j.d@gmail.com')
        params.subject.should.eql('Betaling ontvangen')
      });

      it('persists that the user was in fact notified', () => {
        return SentEmail.find().then(res => {
          res.length.should.eq(1)
          res[0].user_id.toString().should.eq(user._id.toString())
          res[0].descriptor.should.eq('payment_confirmation')
        })
      });
    }); // End of context 'when the user has not yet received a payment'
  }); // End of describe 'payment_confirmed'
}); // End of describe 'email notifier'
