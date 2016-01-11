var UnlockCode = require('../../src/models/unlock_code')

module.exports = {
  default(params) {
    return UnlockCode.create()
  },

  used(params) {
    return UnlockCode.create().then((uc) => {
      uc.activated_by = "123456789012345678901234"
      return uc.save();
    })
  }
}
