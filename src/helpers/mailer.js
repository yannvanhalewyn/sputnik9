(function() {

  "use strict";

  var nodemailer = require('nodemailer')
    , smtpTransport = require('nodemailer-smtp-transport')
    , Logger = require('../lib/logger')
    , fs = require('fs')

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

      Logger.info("Sending email:", mailopts);

      if (process.env["NODE_ENV"] == 'production') {
        realSendEmail(mailopts);
      } else {
        fakeSendEmail(mailopts);
      }
    }
  }

  var realSendEmail = mailopts => {
    transporter.sendMail(mailopts, function(err, info) {
      if (err) return Logger.error("MAIL error:", err);
      Logger.info("Mail sent!", info);
    })
  }

  var fakeSendEmail = email => {
    var fileName = `tmp/${email.to}-${Date.now()}.html`
    fs.writeFile(fileName, email.html, function(err) {
      if (err) console.log(err);
      require('child_process').exec(`open ${fileName}`)
    })
  }

  module.exports = mailer;

}())

