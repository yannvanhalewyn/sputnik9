var Song = require('../models/song');

module.exports = (req, res, next) => {
  return Song.findById(req.params.song_id).then(e => {
    if (!e) return next(`Could not find song ${req.params.song_id}`)
    req.song = e
    next();
  }, err => next(`${req.params.song_id} is not a valid song ID`))
}
