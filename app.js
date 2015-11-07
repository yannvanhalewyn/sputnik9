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

  app.get('/', function(req, res) {
    res.render('index', { title: "Hello!", message: "Hello there!" });
  });

  app.get('/login', function(req, res) {
    res.render("login");
  });

  app.post('/login', function(req, res) {
    res.send(req.body);
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
  });

  app.post('/signup', function(req, res) {
    res.send(req.body);
  });

  app.get('/premium', function(req, res) {
    res.send("The premium space. You are logged in as: " + req.user)
  });

  module.exports = app;

}())
