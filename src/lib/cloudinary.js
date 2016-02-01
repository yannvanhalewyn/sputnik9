var cloudinary = require('cloudinary')
  , config     = require('../../config/config')
  , _          = require("lodash")
  , Q          = require('q')

cloudinary.config({
  cloud_name: 'sputnik9',
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
})

var fetchIdsFor = directory => {
  return cloudinary.v2.api.resources({prefix: directory, type: 'upload'})
    .then(result => _.map(result.resources, r => r.public_id))
}

var fetchIdsForMultiple = directories => {
  return Q.all(_.map(directories, fetchIdsFor))
    .then(results => _.mapKeys(results, (_, idx) => directories[idx]))
}

module.exports.fetchIdsFor = fetchIdsFor;
module.exports.fetchIdsForMultiple = fetchIdsForMultiple;
