#!/usr/bin/env node

process.env['NODE_ENV'] = 'production'
require('dotenv/config');

var include = require('include')
  , emails  = include('src/helpers/emails')
  , mailer  = include('src/lib/mailer')
  , User    = include('src/models/user')
  , db      = include('config/db')
  , _       = require('lodash')
  , Q       = require('q')
  , Logger  = include('src/lib/logger')
db.connect();

var email = (user) => emails.new_content(user, process.argv[2])

User.notifiable().then(users => {
  Q.allSettled(_.map(users, (u) => email(u).then(mailer.send)))
  .then((res) => {
    var grouped = _.groupBy(res, (r) => r.state)
    if (grouped.fulfilled) Logger.info('sent:', grouped.fulfilled)
    if (grouped.rejected) Logger.error('failed:', grouped.rejected)
  })
})
