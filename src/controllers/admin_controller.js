(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin');

  var AdminController = {
    middlewares: {
      index: [requireAdmin]
    },

    index: function(req, res) {
      res.render('admin_panel', {layout: 'admin'})
    }
  }

  module.exports = AdminController;
}())
