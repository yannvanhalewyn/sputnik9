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
  }
})

var UnlockCode = mongoose.model('UnlockCode', unlockCodeSchema)

/**
 * Creates a new unlock code with a random 24bit hash code
 * @return {Promise} A promise for the created unlock code object
 */
UnlockCode.create = () => {

  var defered = Q.defer();

  crypto.randomBytes(CODE_LENGTH / 2, (err, buff) => {
    if (err) return defered.reject(err);
    return new UnlockCode({code: buff.toString('hex')}).save()
      .then(defered.resolve, defered.reject)
  })

  return defered.promise;
}

module.exports = UnlockCode
