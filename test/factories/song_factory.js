var Song = require('../../src/models/song')
  , _ = require('lodash')

module.exports = {
  default(params) {
    return new Song(_.merge({title: 'the title'}, params)).save()
  }
}
