(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin')
    , UnlockCode = require('../models/unlock_code')

  var AdminController = {
    middlewares: {
      index: [requireAdmin]
    },

    index: function(req, res) {
      UnlockCode.find().then(codes => {
        res.render('admin_panel', {layout: 'admin', codes})
      })
    }
  }

  module.exports = AdminController;
}())
