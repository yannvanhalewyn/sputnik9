(function() {

  "use strict";

  var helpers = {
    ifvalue: function(value) {
      if (value) {
        return "value=" + value
      }
    }
  }

  module.exports = helpers;

}())
