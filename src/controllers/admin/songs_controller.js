"use strict";

var requireAdmin = require('../../middlewares/require_admin')
  , Song = require('../../models/song')
  , findSong = require('../../middlewares/find_song')

var redirect = (url) => (err, req, res, next) => {
  req.session.flash = { type: 'danger', message: err }
  res.redirect(url)
}

var AdminEntriesController = {
  middlewares: {
    index: [requireAdmin],
    new: [requireAdmin],
    edit: [requireAdmin, findSong, redirect('/admin/songs')],
    update: [requireAdmin, findSong, redirect('/admin/songs')],
    create: [requireAdmin],
    delete: [requireAdmin, findSong, redirect('/admin/songs')]
  },

  index: (req, res) => {
    Song.find({}, {}, {sort: {_id: 1}}).then(songs => {
      res.render('admin/songs/index', {layout: 'admin', songs})
    })
  },

  edit: (req, res) => {
    res.render('admin/songs/edit', { layout: 'admin', song: req.song })
  },

  new: (req, res) => res.send('new'),

  update: (req, res) => {
    res.send(`update ${req.params.song_id}`)
  },

  create: (req, res) => res.send('update'),

  delete: (req, res) => res.send('delete')
}

module.exports = AdminEntriesController;