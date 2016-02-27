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
    req.entry.update(req.body).then(() => {
      req.session.flash = { type: 'success', message: 'Entry is aangepast!' }
      res.redirect(req.entry._id)
    })
  }
}

module.exports = AdminEntriesController;
