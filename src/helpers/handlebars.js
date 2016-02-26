(function() {

  "use strict";

  var helpers = {
    active_view: (a, b) => a == b ? 'active' : '',
    checkmark: (val) => val ? '&#10003;' : '',
    inc: i => i + 1
  }

  module.exports = helpers;

}())
