(function() {

  "use strict";

  var mongoose = require('mongoose');

  function connect() {

    mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/lars_opdracht");

    var db = mongoose.connection;

    db.on('error', console.error);

    db.once('open', function() {
      console.log("MongoDB connection established.");
    });
  }

  module.exports.connect = connect;

}())
