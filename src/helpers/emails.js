(function() {

  "use strict";

  var exphbs = require('express-handlebars');
  var hbs = exphbs.create();

  function verificationUrl(token) {
    return "http://dev.sputnik9.nl/verify?token=" + token;
  }

  function emailFromTemplate(path_to_template, context, email_opts) {
    return hbs.render(path_to_template, context, {cached: true})
    .then(function(html) {
      email_opts.html = html;
      email_opts.from = "Sputnik9 <noreply@sputnik9.nl>"
      return email_opts;
    });
  }

  var emails = {
    emailConfirmation: function(user) {
      return emailFromTemplate(
        "views/emails/email_verification.hbs", {
          name: user.first_name,
          verify_url: verificationUrl(user.local_data.confirmation_token)
        }, {
          to: user.email,
          subject: "Please activate your account.",
        }
      );
    }
  }

  module.exports = emails;

}())
