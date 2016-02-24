(function() {

  "use strict";

  var helpers = {
    active_view: (a, b) => a == b ? 'active' : '',
    checkmark: (val) => val ? '&#10003;' : ''
  }

  module.exports = helpers;

}())
