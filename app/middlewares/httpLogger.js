import morgan from 'morgan';
import { logger } from '@logger';
import { isDev } from '@config';

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = () => {
  return morgan(isDev ? 'short' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};

export default httpLogger;
