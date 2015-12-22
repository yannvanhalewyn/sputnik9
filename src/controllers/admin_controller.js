(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin');

  var AdminController = {
    middlewares: {
      index: [requireAdmin]
    },

    index: function(req, res) {
      res.send("Admin panel")
    }
  }

  module.exports = AdminController;
}())
