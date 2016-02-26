"use strict";

var requireAdmin = require('../../middlewares/require_admin')
  , Entry = require('../../models/entry')

var AdminEntriesController = {
  middlewares: {
    index: [requireAdmin],
    edit: [requireAdmin],
    update: [requireAdmin]
  },

  index: (req, res) => {
    Entry.find({}, {title: true}).then(entries => {
      res.render('admin/entries/index', {layout: 'admin', entries})
    })
  },

  edit: (req, res) => {
    res.render('admin/entries/edit', {layout: 'admin'})
  },

  update: (req, res) => {
    req.session.flash = { type: 'success', message: 'Entry is aangepast!' }
    res.redirect('/admin/entries')
  }
}

module.exports = AdminEntriesController;
