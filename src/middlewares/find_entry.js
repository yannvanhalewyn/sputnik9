var Entry = require('../models/entry');

module.exports = (req, res, next) => {
  return Entry.findById(req.params.entry_id).then(e => {
    if (!e) return next(`Could not find entry ${req.params.entry_id}`)
    req.entry = e
    next();
  })
}
