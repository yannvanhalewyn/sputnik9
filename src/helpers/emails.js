(function() {

  "use strict";

  var exphbs = require('express-handlebars');
  var hbs = exphbs.create();

  function verificationUrl(token) {
    return "http://sputnik9.nl/verify?token=" + token;
  }

  var emails = {
    emailConfirmation: function(user) {
      return hbs.render(
        "views/emails/email_verification.hbs",
        {
          name: user.first_name,
          verify_url: verificationUrl(user.confirmation_token)
        },
        {cached: true}
      ).then(function(html) {
        return {
          to: user.email,
          subject: "Please activate your account.",
          html: html
        }
      })
    }
  }

  module.exports = emails;

}())
