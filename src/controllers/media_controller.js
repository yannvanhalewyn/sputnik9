(function() {

  "use strict";

  var Media = require('../models/media')
    , requireLogin = require('../middlewares/requireLogin')
    , requireVerifiedEmail = require('../middlewares/require_verified_email')


  var VideosController = {

    middlewares: {
      index: [requireLogin, requireVerifiedEmail],
      show: [requireLogin, requireVerifiedEmail]
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
    }
  }

  module.exports = VideosController;

}())
