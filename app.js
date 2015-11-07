(function() {

  "use strict";

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var session = require("express-session");

  // Static files
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    resave: false, // Or true if future store uses "touch()"
    secret: 'asdfghjkl;qwertyuio3456789kjnbkajs',
    saveUninitialized: false
    // httpOnly: true
  }));

  // Setup
  app.set('view engine', 'jade');

  // Establish db connection
  var db = require('./config/db');
  db.connect();

  // Custom middlewares
  var getLoggedInUser = require("./src/middlewares/getLoggedInUser");
  app.use(getLoggedInUser);

  // Setup Routes
  var routes = require('./config/routes')
  routes(app);

  module.exports = app;

}())
