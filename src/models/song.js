var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
  title: String,
  artists: String,
  url: String
})

var Song = mongoose.model('Song', songSchema)

module.exports = Song
