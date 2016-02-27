var requireAdmin = require('../middlewares/require_admin')
  , UnlockCode = require('../models/unlock_code')
  , mailer = require('../lib/mailer')
  , emails = require('../helpers/emails')
  , Logger = require('../lib/logger')

var isValidEmail = (email) => /^.+@.+\..+$/.test(email)

module.exports = {
  middlewares: {
    index: [requireAdmin],
    create: [requireAdmin]
  },

  index: (req, res) => {
    UnlockCode.find().populate('activated_by').then(codes => {
      res.render('admin/home', {layout: 'admin', codes: JSON.stringify(codes)})
    })
  },

  create(req, res) {
    UnlockCode.create(req.body.email).then(uc => {
      if (isValidEmail(req.body.email)) {
        emails.sendUnlockCode(req.body.email, uc.code)
          .then(mailer.send).catch(Logger.error)
      }
      req.session.flash = { type: 'success', message: 'Je unlock-code is aangemaakt!' }
      res.redirect('/admin/unlock_codes')
    })
  }
}
