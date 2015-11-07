(function() {

  "use strict";

  var mongoose = require('mongoose');

  var userSchema = mongoose.Schema({
    first_name: {
      type: String,
      minlength: 3,
      required: true
    },
    last_name: {
      type: String,
      minlength: 3,
      required: true
    },
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true
    },
    password_digest: String
  });

  var User = mongoose.model('User', userSchema);

  module.exports = User;

}())
