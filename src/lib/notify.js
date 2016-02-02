var mailer = require('./mailer')
  , emails = require('../helpers/emails')
  , SentEmail = require('../models/sent_email')

var payment_confirmation = (user) => {
  return emails.payment_confirmed(user).then(mailer.send).then(() => {
    return SentEmail.create(
      { user_id: user._id, descriptor: 'payment_confirmation' }
    )
  })
}

module.exports.payment_confirmation = payment_confirmation
