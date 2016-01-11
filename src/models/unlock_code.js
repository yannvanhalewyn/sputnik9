var mongoose = require('mongoose')
  , crypto = require('crypto')
  , Q = require('q')

const CODE_LENGTH = 24

var unlockCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    minLength: 24,
    maxLength: 24
  },
  sent_to: String,
  activated_by: mongoose.Schema.Types.ObjectId
})

unlockCodeSchema.methods = {

  /**
   * Checks if the unlock code has been used.
   * @return {Boolean} Wether of not the unlock code had been used.
   */
  isValid() {
    return !Boolean(this.activated_by)
  },


  /**
   * Uses the unlock code for a given user.
   *
   * @param {Object} user The user object for which the code is to be used.
   * @return {Promise} A promise that will reject if the unlock code is
   * already in use. On resolve, it will contain an object with the updated
   * user and unlock code objects.
   */
  use(user) {
    if (!this.isValid()) return Q.reject("This unlock code has already been used.")
    this.activated_by = user._id;
    user.premium = true;
    return Q.all([this.save(), user.save()]).then(result => {
      return {unlock_code: result[0], user: result[1]}
    })
  }
}

var UnlockCode = mongoose.model('UnlockCode', unlockCodeSchema)

/**
 * Creates a new unlock code with a random 24bit hash code
 * @param {String} optionalRecipient and optional recipient of the code to be
 * stored for later reference only.
 * @return {Promise} A promise for the created unlock code object
 */
UnlockCode.create = (optionalRecipient) => {

  var defered = Q.defer();

  crypto.randomBytes(CODE_LENGTH / 2, (err, buff) => {
    if (err) return defered.reject(err);
    return new UnlockCode({code: buff.toString('hex'), sent_to: optionalRecipient})
      .save().then(defered.resolve, defered.reject)
  })

  return defered.promise;
}

module.exports = UnlockCode
