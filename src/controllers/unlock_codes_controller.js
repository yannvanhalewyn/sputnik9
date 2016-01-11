var requireAdmin = require('../middlewares/require_admin')
  , UnlockCode = require('../models/unlock_code')
  , mailer = require('../helpers/mailer')
  , emails = require('../helpers/emails')

module.exports = {
  middlewares: {
    post: [requireAdmin]
  },

  post(req, res) {
    UnlockCode.create(req.body.email).then(uc => {
      emails.sendUnlockCode(req.body.email, uc.code).then(mailer.send)
      res.redirect('/admin')
    })
  }
}
