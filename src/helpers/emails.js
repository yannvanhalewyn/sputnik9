(function() {

  "use strict";

  var exphbs = require('express-handlebars')
    , hbs = exphbs.create()
    , config = require('../../config/config')

  function verificationUrl(token) {
    return `https://${config.host}/verify?token=${token}`;
  }

  var unsubscribe_url = (user) => `https://${config.host}/unsubscribe?u=${user._id}`

  function emailFromTemplate(path_to_template, context, email_opts) {
    return hbs.render(path_to_template, context, {cached: true})
    .then(html => {
      email_opts.html = html;
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
          subject: "Bevestig je e-mail adres!",
        }
      );
    },

    sendUnlockCode(email, code) {
      return emailFromTemplate(
        "views/emails/send_unlock_code.hbs", {
          code: code
        }, {
          to: email,
          subject: "Premium activatiecode."
        }
      )
    },

    new_content(user, content) {
      return emailFromTemplate(
        `views/emails/notifications/${content}.hbs`, {
          name: user.first_name,
          unsubscribe_url: unsubscribe_url(user)
        }, {
          to: user.email,
          subject: 'Er is nieuwe Sputnik 9 content!'
        }
      )
    }
  }

  module.exports = emails;

}())
