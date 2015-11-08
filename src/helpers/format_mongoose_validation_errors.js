(function() {

  "use strict";

  var _ = require('lodash');

  var MESSAGES = {
    "required": "should not be empty.",
    "minlength": "is too short.",
    "regexp": "is invalid."
  }

  var formatMongooseValidationErrors = function(input) {
    var err = {};

    if (input.code == 11000 || input.code == 11001) {
      err.email = "This email has already been registered."
    }

    _.each(input.errors, function(props, field) {
      err[field] = MESSAGES[props.properties.type];
    });

    return err;
  }

  module.exports = formatMongooseValidationErrors;

}())
