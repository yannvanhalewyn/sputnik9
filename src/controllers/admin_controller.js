(function() {

  "use strict";

  var requireAdmin = require('../middlewares/require_admin')
    , User = require('../models/user')
    , report = require('../lib/report')

  var AdminController = {
    middlewares: {
      index: [requireAdmin],
      users: [requireAdmin]
    },

    index: (req, res) => res.redirect('/admin/entries'),

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
