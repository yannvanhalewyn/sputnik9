var express = require('express')
  , Entry = require('../models/entry')
  , Song = require('../models/song')
  , requireLogin = require('../middlewares/requireLogin')
  , requireVerifiedEmail = require('../middlewares/require_verified_email')
  , paywall = require('../middlewares/paywall')
  , handleUnpaidUser = require('../middlewares/handle_unpaid_user')

var VideosController = {
  middlewares: {
    index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser]
  },

  index: (req, res) => {
    Entry.find({}, {}, {sort: {_id: 1}}).then(entries => {
      Song.find({}, {}, {sort: {_id: 1}}).then(songs => res.render('premium', {
        entries: JSON.stringify(entries),
        songs: JSON.stringify(songs)
      }))
    })
  }
}

module.exports = VideosController;
