var express = require('express')
  , requireLogin = require('../middlewares/requireLogin')
  , requireVerifiedEmail = require('../middlewares/require_verified_email')
  , paywall = require('../middlewares/paywall')
  , handleUnpaidUser = require('../middlewares/handle_unpaid_user')
  , cloudinary = require('../lib/cloudinary')

var img_ids;

var VideosController = {
  middlewares: {
    index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser]
  },

  index: (req, res) => {
    if (!img_ids) {
      cloudinary.fetchIdsFor('entry_1').then(ids => {
        img_ids = ids
        res.render('premium', { images: img_ids })
      })
    } else {
      return res.render('premium', { images: img_ids })
    }
  }
}

module.exports = VideosController;
