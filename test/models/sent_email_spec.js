var include = require('include');
require('chai').should();
var SentEmail = include('src/models/sent_email');
var db = require('../util/test_db');

before(db.connect)
afterEach(db.teardown)

describe('email_notification', () => {
  context('initialisation', () => {
    beforeEach(() => {
      return SentEmail.create({
        user_id: '123456789012345678901234',
        descriptor: 'payment_confirmation'
      })
    });

    it('stores a user_id, email descriptor and timestamp of now', () => {
      return SentEmail.find().then(res => {
        res[0].user_id.toString().should.eql('123456789012345678901234')
        res[0].descriptor.should.equal('payment_confirmation')
        res[0].sent_at.should.be.a('date')
        res[0].sent_at.getTime().should.be.closeTo(Date.now(), 200)
      })
    });
  }); // End of context 'initialisation'
}); // End of describe 'email_notification'
