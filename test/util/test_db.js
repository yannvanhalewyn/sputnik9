(function() {

  "use strict";

  var mongoose = require('mongoose')
    , _ = require('lodash')
    , Q = require('q')

  var connect = function() {

    var defered = Q.defer();

    mongoose.connect("mongodb://localhost:27017/test")

    var db = mongoose.connection;

    db.on('error', defered.reject);

    db.once('open', function() {
      console.log("MongoDB connection established with test database.");
      defered.resolve();
    });

    return defered.promise;

  }

  var teardown = function() {
    _.each(mongoose.connection.collections, function(collection) {
      collection.drop();
    })
  }

  module.exports.connect = connect;
  module.exports.teardown = teardown;

}())
