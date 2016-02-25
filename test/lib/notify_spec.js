require('../spec_helper')
var mailer         = include('src/lib/mailer')
  , notify         = include('src/lib/notify')
  , SentEmail = include('src/models/sent_email')

describe('email notifier', () => {

  beforeEach(() => { sinon.stub(mailer, 'send') });
  afterEach(() => mailer.send.restore());

  describe('payment_confirmation', () => {
    context('when the user has not yet received an email', () => {
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

    context('when the user had already received an email', () => {
      beforeEach(() => {
        return Factory('user').then(u => {
          return SentEmail.create(
            {user_id: u._id, descriptor: 'payment_confirmation'}
          ).then(() => { return notify.payment_confirmation(u) })
        })
      });

      it('doesnt send another email', () => {
        return mailer.send.should.not.have.been.called
      });

      it('doesnt create another SentEmail', () => {
        return SentEmail.find().then(res => {
          res.length.should.eql(1)
        })
      });
    }); // End of context 'when the user had already received an email'
  }); // End of describe 'payment_confirmed'
}); // End of describe 'email notifier'
