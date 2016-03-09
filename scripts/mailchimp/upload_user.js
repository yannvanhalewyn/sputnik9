#!/usr/bin/env node

require('dotenv/config')

var mailchimpApi = require('mailchimp-api')
  , Q = require('q')
  , db = require('../../config/db')
  , User = require('../../src/models/user')
db.connect();

const LIST_NAME = 'Sputnik 9 Notifications'

var mc = new mailchimpApi.Mailchimp(process.env['MAILCHIMP_API_KEY'], true)

var getLists = (params) => {
  var deferred = Q.defer()
  mc.lists.list(params, deferred.resolve, deferred.reject)
  return deferred.promise
}

var addMember = params => {
  var deferred = Q.defer()
  mc.lists.subscribe(params, deferred.resolve, deferred.reject)
  return deferred.promise
}

var status = u => u.receive_emails ? 'subscribed' : 'unsubscribed'
var merge_fields = u => { return { FNAME: u.first_name, LNAME: u.last_name }}
var parse_user = u => { return { email: {email: u.email}, merge_fields: merge_fields(u) }}

var u = {email: 'yann_vanhalewyn@hotmail.com', first_name: 'Foo', last_name: 'Bar'}

getLists().then(lists => lists.data.filter(l => l.name == LIST_NAME)[0]).then(list => {
  var params = {
    id: list.id,
    email: { email: u.email },
    merge_vars: merge_fields(u),
    double_optin: false
  }
  return addMember(params)
}).then(console.log, err => console.log('error: ', err))
