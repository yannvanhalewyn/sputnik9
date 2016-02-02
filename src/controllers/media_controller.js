var express = require('express')
  , requireLogin = require('../middlewares/requireLogin')
  , requireVerifiedEmail = require('../middlewares/require_verified_email')
  , paywall = require('../middlewares/paywall')
  , handleUnpaidUser = require('../middlewares/handle_unpaid_user')
  , cloudinary = require('../lib/cloudinary')
  , Q = require('q')

const SHOWN_URI = 'entry_1/'
const HIDDEN_URI = 'entry_1_hidden/'

var img_ids;

var fetchIds = () => {
  if (img_ids) return Q(img_ids)
  return cloudinary.fetchIdsForMultiple([SHOWN_URI, HIDDEN_URI]).then(results => {
    return img_ids = { shown: results[SHOWN_URI], hidden: results[HIDDEN_URI] }
  })
}

var VideosController = {
  middlewares: {
    index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser]
  },

  index: (req, res) => {
    fetchIds().then(ids => res.render('premium', { images: ids }))
  }
}

module.exports = VideosController;
