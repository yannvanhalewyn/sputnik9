(function() {

  "use strict";

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    auth: {
      user: "f3f6d64fa6b85fd7098d925564385c8e",
      pass: "b413ce8d97099cc7c08e3dcb1ea61cb7"
    }
  })

  var mailer = {
    send: function(opts) {
      var mailopts = {
        from: "Fred Foo <yann_vanhalewyn@hotmail.com>",
        to: opts.to,
        subject: opts.subject,
        html: opts.html
      };

      console.log("Will send email: ", mailopts); // Following commented out for testing
      // transporter.sendMail(mailopts, function(err, info) {
      //   if (err) return console.log(err);
      //   console.log("Mail sent!", info);
      // })
    }
  }

  module.exports = mailer;

}())

