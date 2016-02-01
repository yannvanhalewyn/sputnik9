(function() {

  "use strict";

  var cloudinary = require('cloudinary');

  var cl_transformations = {
    lightbox_full: { width: 1000, crop: 'scale' },
    lightbox_thumb_tag: {
      width: 400, height: 400, crop: 'thumb',
      gravity: 'center', class: 'img-responsive'
    }
  }

  var helpers = {
    ifvalue: function(value) {
      if (value) {
        return "value=" + value
      }
    },

    active_view: (a, b) => a == b ? 'active' : '',
    checkmark: (val) => val ? '&#10003;' : '',

    cl_lightbox_url: (id) => cloudinary.url(id, cl_transformations.lightbox_full),
    cl_thumb_tag: (id) => cloudinary.image(id, cl_transformations.lightbox_thumb_tag)

  }

  module.exports = helpers;

}())
