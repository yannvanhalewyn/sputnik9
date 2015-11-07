(function() {

  "use strict";

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

  // Static files
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  // Setup
  app.set('view engine', 'jade');

  // Establish db connection
  var db = require('./config/db');
  db.connect();

  // Setup Routes
  var routes = require('./config/routes')
  routes(app);

  module.exports = app;

}())
