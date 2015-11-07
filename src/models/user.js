(function() {

  "use strict";

  var mongoose = require('mongoose');

  function checkUniqueEmail(email) {

  }

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
      required: true,
      unique: true
    },
    password_digest: String
  });


  var User = mongoose.model('User', userSchema);

  // userSchema.pre("save", function(next) {
  //   User.findOne({email: this.email}).then(
  //     function(found) {
  //       if (found) {
  //         var errormsg = "This email has already been registered";
  //         this.invalidate("email", errormsg);
  //         return next(new Error(errormsg));
  //       }
  //       next();
  //     }.bind(this),
  //     next
  //   )
  // })

  module.exports = User;

}())
