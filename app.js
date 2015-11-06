(function() {

  "use strict";

  var express = require('express');
  var app = express();

  // Static files
  app.use(express.static('public'));

  // Setup
  app.set('view engine', 'jade');

  app.get('/', function(req, res) {
    res.render('index', { title: "Hello!", message: "Hello there!" });
  });

  app.get('/login', function(req, res) {
    res.send("A login page");
  });

  app.post('/login', function(req, res) {
    res.send("Posted a login");
  });

  app.get('/signup', function(req, res) {
    res.send("A signup page");
  });

  app.post('/signup', function(req, res) {
    res.send("POST signup");
  });

  module.exports = app;

}())
