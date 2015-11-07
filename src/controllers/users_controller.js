(function() {

  "use strict";

  var User = require('../models/user')
    , bcrypt = require('../helpers/bcrypt-promisified')

  var users_controller = {

    create: function(req, res) {

      bcrypt.hash(req.body.password, 10).then(function(hash) {

        var newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password_digest: hash
        });

        newUser.save();

        res.send(req.body);
      });
    }
  }

  module.exports = users_controller;

}())
