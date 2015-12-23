(function() {

  "use strict";

  var mongoose = require('mongoose')
    , Logger = require('../src/lib/logger')
    , config = require('./config')

  var DB_URL = config.mongo_url

  function connect() {

    Logger.info("Attempting to connect to:", DB_URL);

    mongoose.connect(DB_URL);

    var db = mongoose.connection;

    db.on('error', Logger.error);

    db.once('open', function() {
      Logger.info("MongoDB connection established.");
    });
  }

  module.exports.connect = connect;

}())
