(function() {

  "use strict";
  var mongoose = require('mongoose');

  var mediaSchema = mongoose.Schema({
    title: String,
    description: String,
    url: String,
    thumb: String,
    kind: String
  })

  var Media = mongoose.model('Media', mediaSchema);

  module.exports = Media;

}())
