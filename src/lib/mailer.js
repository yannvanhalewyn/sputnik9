(function() {

  "use strict";

  var nodemailer = require('nodemailer')
    , smtpTransport = require('nodemailer-smtp-transport')
    , Logger = require('../lib/logger')
    , fs = require('fs')
    , _ = require('lodash')
    , Q = require('q')

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
        from: "Sputnik 9 <noreply@sputnik9.nl>",
        to: opts.to,
        subject: opts.subject,
        html: opts.html
      };

      Logger.info("Sending email:", mailopts);

      if (process.env["NODE_ENV"] == 'production') {
        return realSendEmail(mailopts);
      } else {
        return fakeSendEmail(mailopts);
      }
    }
  }

  var realSendEmail = mailopts => {
    return Q.ninvoke(transporter, 'sendMail', mailopts)
  }

  var fakeSendEmail = email => {
    var fileName = `tmp/${email.to}-${Date.now()}.html`
    return Q.nfcall(fs.writeFile, fileName, email.html).then(() => {
      require('child_process').exec(`open ${fileName}`)
      return `DEV: email written to ${fileName}`
    })
  }

  module.exports = mailer;

}())

