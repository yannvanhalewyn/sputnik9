(function() {

  "use strict";

  var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , session = require("express-session")
    , exphbs = require('express-handlebars')
    , expressWinston = require('express-winston')
    , Logger = require('./src/lib/logger')

  if (process.env.NODE_ENV) Logger.info("Environment: ", process.env.NODE_ENV);

  // Static files
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(session({
    cookie: { httpOnly: true, maxAge: 6000000 }, // TODO secure: true makes login fail. why?
    // store: new session.MemoryStore,
    resave: false, // Or true if future store uses "touch()"
    secret: 'asdfghjkl;qwertyuio3456789kjnbkajs',
    saveUninitialized: true
  }));
  app.use(expressWinston.logger({
    transports: Logger.my_transports,
    meta: false,
    expressFormat: true
  }))

  // Make eventual flashes available for handlebars templates
  app.use(function(req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
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

  // Setup passport and routes
  require('./config/passport')(app);
  require('./config/routes')(app)

  // Use 404 catcher
  app.use(function(req, res) {
    res.status(404).render('404');
  });

  // Last error checker
  app.use(function(err, req, res, next) {
    Logger.error(err);
    var error_msg = "Internal server error."
    if (typeof err == "string") error_msg = err;
    else if (err.message) error_msg = err.message;
    res.status(500).render('error', {error: error_msg})
  });

  module.exports = app;

}())
