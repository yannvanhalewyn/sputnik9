(function() {

  "use strict";

  var nodemailer = require('nodemailer')
    , smtpTransport = require('nodemailer-smtp-transport')
    , Logger = require('../lib/logger')

  var transporter = nodemailer.createTransport(smtpTransport({
    host: "send.one.com",
    secure: true,
    port: 465,
    auth: {
      user: "noreply@sputnik9.nl",
      pass: process.env.SMTP_CLIENT_PSWD
    }
  }));

  var mailer = {
    send: function(opts) {
      var mailopts = {
        from: "Sputnik9 <noreply@sputnik9.nl>",
        to: opts.to,
        subject: opts.subject,
        html: opts.html
      };

      Logger.debug("Will send email: ", mailopts);
      // transporter.sendMail(mailopts, function(err, info) {
      //   if (err) return Logger.error("MAIL error:", err);
      //   Logger.info("Mail sent!", info);
      // })
    }
  }

  module.exports = mailer;

}())

