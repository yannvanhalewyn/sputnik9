var mailer = require('./mailer')
  , emails = require('../helpers/emails')
  , SentEmail = require('../models/sent_email')
  , _ = require('lodash')

const PAYMENT_CONFIRMATION = 'payment_confirmation'

var payment_confirmation = (user) => {

  // Find existing emails to that user id
  return SentEmail.find({ user_id: user._id, descriptor: PAYMENT_CONFIRMATION })
  .then(res => {

    // If any are found, the user was already notified
    if (!_.isEmpty(res)) return;

    // Send email and store as sent email
    return emails.payment_confirmed(user).then(mailer.send).then(() => {
      return SentEmail.create(
        { user_id: user._id, descriptor: PAYMENT_CONFIRMATION }
      )
    })
  })
}

module.exports.payment_confirmation = payment_confirmation
