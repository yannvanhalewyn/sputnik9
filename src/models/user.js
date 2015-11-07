(function() {

  "use strict";

  var mongoose = require('mongoose');

  var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password_digest: String
  });

  var User = mongoose.model('User', userSchema);

  module.exports = User;

}())
