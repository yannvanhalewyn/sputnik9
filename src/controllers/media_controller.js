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
      show: [requireLogin, requireVerifiedEmail],
      stream: [requireLogin, paywall]
    },

    index: function(req, res) {
      Media.find().then(function(all) {
        res.render("media", {media: all})
      });
    },

    show: function(req, res) {
      Media.findById(req.params.id).then(function(medium) {
        res.render("medium", medium);
      });
    },

    stream: express.static('restricted')
  }

  module.exports = VideosController;

}())
