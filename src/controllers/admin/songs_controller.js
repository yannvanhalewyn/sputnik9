"use strict";

var requireAdmin = require('../../middlewares/require_admin')
  , Song = require('../../models/song')

var AdminEntriesController = {
  middlewares: {
    index: [requireAdmin],
    update: [requireAdmin],
  },

  index: (req, res) => {
    Song.find({}, {}, {sort: {_id: 1}}).then(songs => {
      res.render('admin/songs/index', {layout: 'admin', songs})
    })
  },

  update: (req, res) => {
    Song.remove({}).then(() => Song.collection.insert(req.body.songs)).then(() => {
      req.session.flash = { type: 'success', message: 'Songs zijn opgeslagen!' }
      res.redirect('/admin/songs')
    }, err => {
      req.session.flash = { type: 'danger', message: `Er is iets fout gegaan: ${err}` }
      res.redirect('/admin/songs')
    })
  }
}

module.exports = AdminEntriesController;
