const { format, transports, createLogger } = require('winston');
const { isDev, syspath } = require('@config');

const { combine, json, timestamp, label } = format;
const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${syspath.storage}/logs/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${syspath.storage}/logs/errors.log`,
      format: combine(
        label({ label: 'ERROR STACK:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (isDev) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

module.exports = logger;
