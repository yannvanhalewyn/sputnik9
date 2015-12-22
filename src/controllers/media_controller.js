(function() {

  "use strict";

  var express = require('express')
    , Media = require('../models/media')
    , requireLogin = require('../middlewares/requireLogin')
    , requireVerifiedEmail = require('../middlewares/require_verified_email')
    , paywall = require('../middlewares/paywall')
    , handleUnpaidUser = require('../middlewares/handle_unpaid_user')


  var VideosController = {

    middlewares: {
      index: [requireLogin, requireVerifiedEmail, paywall, handleUnpaidUser],
      stream: [requireLogin, paywall]
    },

    index: function(req, res) {
      Media.find().then(function(all) {
        res.render("premium", {media: all})
      });
    },

    stream: express.static('restricted')
  }

  module.exports = VideosController;

}())
