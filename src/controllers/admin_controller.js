(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin')
    , UnlockCode = require('../models/unlock_code')
    , User = require('../models/user')

  var AdminController = {
    middlewares: {
      index: [requireAdmin],
      users: [requireAdmin]
    },

    index: function(req, res) {
      UnlockCode.find().populate('activated_by').then(codes => {
        res.render('admin/home', {layout: 'admin', codes: JSON.stringify(codes)})
      })
    },

    users: (req, res) => {
      User.find().then(users => {
        res.render('admin/users', { layout: 'admin', users })
      })
    }
  }

  module.exports = AdminController;
}())
