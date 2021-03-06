const morgan = require('morgan');
const { logger } = require('@logger');

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = ({ isDev }) => {
  return morgan(isDev ? 'short' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};

module.exports = httpLogger;
