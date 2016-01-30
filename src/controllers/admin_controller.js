(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin')
    , UnlockCode = require('../models/unlock_code')

  var AdminController = {
    middlewares: {
      index: [requireAdmin]
    },

    index: function(req, res) {
      UnlockCode.find().populate('activated_by').then(codes => {
        res.render('admin_panel', {layout: 'admin', codes: JSON.stringify(codes)})
      })
    }
  }

  module.exports = AdminController;
}())