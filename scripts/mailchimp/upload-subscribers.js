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

var batch_register = (data) => {
  var deferred = Q.defer()
  mc.lists.batchSubscribe(data, deferred.resolve, deferred.reject)
  return deferred.promise
}

var status = u => u.receive_emails ? 'subscribed' : 'unsubscribed'
var merge_fields = u => { return { FNAME: u.first_name, LNAME: u.last_name, ID: u._id }}
var parse_user = u => { return { email: {email: u.email}, status: status(u), merge_fields: merge_fields(u) }}


/*
 * DON'T Use this, it will send a confirmation email to every single user
 * Q.all([
 *   getLists().then(lists => lists.data.filter(l => l.name == LIST_NAME)[0]),
 *   User.find()
 * ]).spread((list, users) => {
 *   var batch = users.map(parse_user)
 *   return batch_register({id: list.id, batch})
 * }).then(console.log).catch(console.log)
 */
