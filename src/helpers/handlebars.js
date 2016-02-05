(function() {

  "use strict";

  var cloudinary = require('cloudinary');

  var cl_transformations = {
    lightbox_full: { width: 1000, crop: 'scale', secure: true },
    lightbox_thumb_tag: {
      width: 400, height: 400, crop: 'thumb',
      gravity: 'center', class: 'img-responsive', secure: true
    }
  }

  var helpers = {
    active_view: (a, b) => a == b ? 'active' : '',
    checkmark: (val) => val ? '&#10003;' : '',

    cl_lightbox_url: (id) => cloudinary.url(id, cl_transformations.lightbox_full),
    cl_thumb_tag: (id) => cloudinary.image(id, cl_transformations.lightbox_thumb_tag)

  }

  module.exports = helpers;

}())
