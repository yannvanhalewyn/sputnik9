var cloudinary = require('cloudinary')
  , config     = require('../../config/config')
  , _          = require("lodash")

cloudinary.config({
  cloud_name: 'sputnik9',
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
})

module.exports.fetchIdsFor = directory => {
  return cloudinary.v2.api.resources({prefix: directory, type: 'upload'})
    .then(result => _.map(result.resources, r => r.public_id))
}
