import morgan from 'morgan';
import { transports, createLogger } from 'winston';
import { DEV, ENV, SYSPATH } from '@config';

const winstonLogger = createLogger({
  level: ENV['LOG_LEVEL'],
  exitOnError: false,
  // logs for morgan http request
  transports: [
    new transports.File({
      filename: `${SYSPATH['LOGS']}/access.log`
    })
  ],
  // logs for any exception occured
  exceptionHandlers: [
    new transports.File({
      filename: `${SYSPATH['LOGS']}/exceptions.log`
    })
  ]
});

// add console only for development
if (DEV) {
  winstonLogger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

// winston "stream" writable for morgan
winstonLogger.stream = {
  write: message => {
    winstonLogger.info(message);
  }
};

const logger = () => {
  if (DEV) {
    return morgan('short', {
      stream: winstonLogger.stream
    });
  }

  return morgan('combined', {
    stream: winstonLogger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};

logger.winstonLogger = winstonLogger;

export default logger;
