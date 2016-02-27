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
    new: [requireAdmin],
    edit: [requireAdmin, findEntry, redirect('/admin/entries')],
    update: [requireAdmin, findEntry, redirect('/admin/entries')],
    create: [requireAdmin],
    preview: [requireAdmin]
  },

  index: (req, res) => {
    Entry.find({}, {title: true}, {sort: {_id: 1}}).then(entries => {
      res.render('admin/entries/index', {layout: 'admin', entries})
    })
  },

  edit: (req, res) => {
    res.render('admin/entries/edit', {layout: 'admin', entry: req.entry})
  },

  new(req, res) {
    res.render('admin/entries/new', {layout: 'admin'})
  },

  update: (req, res) => {
    req.entry.update(req.body).then(() => {
      req.session.flash = { type: 'success', message: 'Entry is aangepast!' }
      res.redirect(req.entry._id)
    })
  },

  create: (req, res) => {
    new Entry(req.body).save().then(entry => {
      req.session.flash = { type: 'success', message: 'Entry werd aangemaakt!' }
      return res.redirect('/admin/entries')
    }, err => {
      req.session.flash = {
        type: 'danger',
        message: `Er ging iets fout met het aanmaken van de entry: ${err}`
      }
      return res.redirect('/admin/entries/new')
    })
  },

  preview: (req, res) => {
    res.render('premium', {entries: JSON.stringify([req.body])})
  }
}

module.exports = AdminEntriesController;
