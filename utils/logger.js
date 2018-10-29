import { format, transports, createLogger } from 'winston';
import { DEV, SYSPATH } from '@config';

const { combine, json, timestamp, label } = format;
const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${SYSPATH['LOGS']}/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${SYSPATH['LOGS']}/errors.log`,
      format: combine(
        label({ label: 'ERROR STACK:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (DEV) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

export default logger;
