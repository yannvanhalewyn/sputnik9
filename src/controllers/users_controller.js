(function() {

  "use strict";

  var users_controller = {

    create: function(req, res) {
      res.send(req.body);
    }
  }

  module.exports = users_controller;

}())
