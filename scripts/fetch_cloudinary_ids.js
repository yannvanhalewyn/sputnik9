#!/usr/bin/env node

require('dotenv/config')
var cloudinary = require('cloudinary')
  , config = require('../config/config')
  , cl = require('../src/lib/cloudinary')

cl.fetchIdsFor('entry_2').then(console.log)
