import logger from '@utils/logger';

// handling error from `createError` factory, by default
// `500` status code will be used if `err.statusCode` is not available
// eslint-disable-next-line no-unused-vars
const errorHandler = () => (err, req, res, next) => {
  err.code = err.statusCode || 500;
  res.status(err.code);

  const errData = {
    errors: [
      {
        name: err.name,
        code: err.code,
        message: err.message
      }
    ]
  };

  // logs error stack
  logger.error(err.stack);

  // giving erros in JSON format if request made via Ajax
  // otherwise, rendering error page with `errData` as argument
  if (req.xhr) {
    res.json(errData);
  } else {
    res.render('error', errData);
  }
};

export default errorHandler;
