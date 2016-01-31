var Q = require('q')
  , User = require('../models/user')

/**
 * Unsubscribes a user from email notifications
 *
 * @param {String} user_id The user_id of the user we want to unsubscribe
 * @returns {Promise} A promise that will resolve if successful. The promise
 * will reject if no user is found by $user_id or if the user was already
 * unsubscribed
 */
module.exports = (user_id) => {
  return User.findById(user_id).then((user) => {

    if (!user)
      return Q.reject('Ongeldige gebruikers ID.')

    if (!user.receive_emails)
      return Q.reject('Je was al afgemeld van de nieuwsmeldingen.')

    user.receive_emails = false;
    return user.save();
  })
}
