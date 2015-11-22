var Winston = require('winston')
  , dateFormat = require('dateformat')

var todayFormatted = dateFormat.bind(null, "yyyy-mm-dd_HH-MM-ss");

var transports = [
  new Winston.transports.File({
    level: 'info',
    filename: 'logs.json',
    json: true,
    maxsize: 5242880, // 5Mb
    maxfiles: 5,
    colorize: false,
    timestamp: todayFormatted
  }),
  new Winston.transports.Console({
    level: 'debug',
    json: false,
    colorize: true,
    timestamp: todayFormatted
  })
]

var Logger = new Winston.Logger({
  transports: transports,
  exitOnError: false
});

module.exports = Logger;
module.exports.my_transports = transports;
