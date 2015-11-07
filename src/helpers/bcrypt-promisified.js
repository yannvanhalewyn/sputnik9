(function() {

  "use strict";

  var Q = require('q')
    , bcrypt = require('bcrypt');


  var bcrypt_promisified = {

    hash: Q.denodeify(bcrypt.hash),

    compare: function(password, hash) {

      var defered = Q.defer();

      bcrypt.compare(password, hash, function(err, res) {
        if (err) defered.reject(err);
        defered.resolve(res);
      });

      return defered.promise;
    }
  }

  module.exports = bcrypt_promisified;

}())
