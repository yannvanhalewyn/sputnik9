var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
  title: String,
  artists: String,
  cloudinary_id: String
})

var Song = mongoose.model('Song', songSchema)

module.exports = Song
