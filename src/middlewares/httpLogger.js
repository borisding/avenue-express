import morgan from 'morgan';
import { logger } from '@utils';
import { DEV } from '@config';

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = () => {
  if (DEV) {
    return morgan('short', {
      stream: logger.stream
    });
  }

  return morgan('combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};

export default httpLogger;
