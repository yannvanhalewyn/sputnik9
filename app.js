(function() {

  "use strict";

  var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , session = require("express-session")
    , exphbs = require('express-handlebars')

  // Static files
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    // cookie: { maxAge: 60000 },
    // store: new session.MemoryStore,
    resave: false, // Or true if future store uses "touch()"
    secret: 'asdfghjkl;qwertyuio3456789kjnbkajs',
    saveUninitialized: true
  }));

  // Make eventual flashes available for handlebars templates
  app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    next();
  });

  // Setup view engine
  app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./src/helpers/handlebars")
  }));
  app.set('view engine', 'hbs');

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
