var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  order: Number,
  title: String,
  videos: [{
    title: String,
    url: String
  }],
  performers: [{
    name: String,
    instrument: String,
    thumb_id: String,
    about: String
  }],
  blog: String,
  lyrics: String,
  photos: {
    shown: [String],
    hidden: [String]
  },
  contributors: [{
    title: String,
    body: String
  }]
})

var Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry
