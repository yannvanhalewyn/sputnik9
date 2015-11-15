(function() {

  "use strict";

  var mongoose = require('mongoose');

  var DB_URL = (process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + "sputnik9";

  function connect() {

    console.log("Attempting to connect to:", DB_URL);

    mongoose.connect(DB_URL);

    var db = mongoose.connection;

    db.on('error', console.error);

    db.once('open', function() {
      console.log("MongoDB connection established.");
    });
  }

  module.exports.connect = connect;

}())
