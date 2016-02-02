var csv = require('json2csv');
var User   = require('../models/user')
var Q      = require('q')

var fields = ['first_name', 'last_name', 'email', 'receive_emails', 'premium', 'provider']

module.exports = {
  all_users_as_csv: () => User.find().then(data => Q.nfcall(csv, {fields, data}))
}
