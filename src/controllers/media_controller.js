var express = require('express')
  , requireLogin = require('../middlewares/requireLogin')
  , requireVerifiedEmail = require('../middlewares/require_verified_email')
  , paywall = require('../middlewares/paywall')
  , handleUnpaidUser = require('../middlewares/handle_unpaid_user')

var VideosController = {
  middlewares: {
    index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser]
  },

  index: (req, res) => res.render('premium')
}

module.exports = VideosController;
