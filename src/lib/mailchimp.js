require('dotenv/config')
var mc_api = require('mailchimp-api')
  , config = require('../../config/config')
  , Q      = require('q')

var mc = new mc_api.Mailchimp(config.mailchimp_api_key)

function merge_fields(user) {
  return { FNAME: user.first_name, LNAME: user.last_name }
}

var subscribe = params => {
  var deferred = Q.defer()
  mc.lists.subscribe(params, deferred.resolve, deferred.reject)
  return deferred.promise
}

module.exports = {
  getList() {
    var deferred = Q.defer()
    mc.lists.list({
      filters: { list_name: config.mailchimp_list_name }
    }, deferred.resolve, deferred.reject)
    return deferred.promise.then(res => res.data[0])
  },

  subscribe(user) {
    return this.getList().then(list => {
      var params = {
        id: list.id,
        email: { email: user.email },
        merge_vars: merge_fields(u),
        double_optin: false
      }
      return subscribe(params)
    })
  }
}

