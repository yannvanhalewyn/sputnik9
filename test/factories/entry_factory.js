var Entry = require('../../src/models/entry')
  , _ = require('lodash')

module.exports = {
  default(params) {
    return new Entry(_.merge({title: 'the title'}, params)).save()
  }
}
