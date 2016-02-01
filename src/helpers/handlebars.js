(function() {

  "use strict";

  var helpers = {
    ifvalue: function(value) {
      if (value) {
        return "value=" + value
      }
    },

    active_view: (a, b) => a == b ? 'active' : '',
    checkmark: (val) => val ? '&#10003;' : ''
  }

  module.exports = helpers;

}())
