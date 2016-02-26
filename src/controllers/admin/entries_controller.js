"use strict";

var requireAdmin = require('../../middlewares/require_admin')
  , Entry = require('../../models/entry')
  , findEntry = require('../../middlewares/find_entry')

var redirect = (url) => (err, req, res, next) => {
  req.session.flash = { type: 'danger', message: err }
  res.redirect(url)
}

var AdminEntriesController = {
  middlewares: {
    index: [requireAdmin],
    edit: [requireAdmin, findEntry, redirect('/admin/entries')],
    update: [requireAdmin, findEntry, redirect('/admin/entries')],
    create: [requireAdmin]
  },

  index: (req, res) => {
    Entry.find({}, {title: true}).then(entries => {
      res.render('admin/entries/index', {layout: 'admin', entries})
    })
  },

  edit: (req, res) => {
    res.render('admin/entries/edit', {layout: 'admin', entry: req.entry})
  },

  update: (req, res) => {
    req.entry.update(req.body).then(() => {
      req.session.flash = { type: 'success', message: 'Entry is aangepast!' }
      res.redirect(req.entry._id)
    })
  },

  create: (req, res) => {
    res.send('create')
  }
}

module.exports = AdminEntriesController;
