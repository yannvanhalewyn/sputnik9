(function() {

  "use strict";

  function verificationUrl(token) {
    return "http://localhost:3000/verify?token=" + token;
  }

  var emails = {
    emailConfirmation: function(user) {
      return {
        to: user.email,
        subject: "Please activate your account.",
        html: "<!DOCTYPE html> <html> <head> <style type=\"text/css\" media=\"screen\"> h1 { color: red; } a { background: orange; color: white; padding: 10px; margin: auto; text-decoration: none; } </style> </head> <body> <h1>Hello {{name}}</h1> <p>Please confirm with us that this is in fact your email address.</p> <a href=\"{{link}}\">Activate your account!</a> </body> </html>"
        .replace("{{link}}", verificationUrl(user.confirmation_token))
        .replace("{{name}}", user.first_name)
      }
    }
  }

  module.exports = emails;

}())
