(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin')
    , UnlockCode = require('../models/unlock_code')
    , User = require('../models/user')
    , report = require('../lib/report')

  var AdminController = {
    middlewares: {
      index: [requireAdmin],
      users: [requireAdmin]
    },

    index: (req, res) => {
      UnlockCode.find().populate('activated_by').then(codes => {
        res.render('admin/home', {layout: 'admin', codes: JSON.stringify(codes)})
      })
    },

    users: (req, res) => {
      User.find().then(users => {
        res.render('admin/users', { layout: 'admin', users })
      })
    },

    usersCSV: (req, res) => {
      report.all_users_as_csv().then(csv => {
        res.set({"Content-Disposition":"attachment; filename=users.csv"});
        res.send(csv)
      })
    }
  }

  module.exports = AdminController;
}())
