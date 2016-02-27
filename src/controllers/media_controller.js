var express = require('express')
  , Entry = require('../models/entry')
  , Song = require('../models/song')
  , requireLogin = require('../middlewares/requireLogin')
  , requireVerifiedEmail = require('../middlewares/require_verified_email')
  , paywall = require('../middlewares/paywall')
  , handleUnpaidUser = require('../middlewares/handle_unpaid_user')
  , Q = require('q')

var VideosController = {
  middlewares: {
    index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser]
  },

  index: (req, res, next) => {
    Q.all([
      Entry.find({}, {}, {sort: {_id: 1}}),
      Song.find({}, {}, {sort: {_id: 1}})
    ]).spread((entries, songs) => {
      res.render('premium', {
        entries: JSON.stringify(entries),
        songs: JSON.stringify(songs)
      })
    }).catch(next)
  }
}

module.exports = VideosController;
