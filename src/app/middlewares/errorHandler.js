import isDev from 'isdev';

// handling error from `createError` factory, by default
// if using, say `Error` constructor directly, `err.statusCode` should be specified
// or else, `500` status code will be used
const errorHandler = () => (err, req, res, next) => {
  isDev && console.error(err.stack);

  res.status(err.statusCode || 500);

  const errData = {
    errors: [
      {
        name: err.name,
        code: err.statusCode,
        message: err.message
      }
    ]
  };

  // giving erros in JSON format if request made via Ajax
  // otherwise, rendering error page with `errData` as argument
  if (req.xhr) {
    res.json(errData);
  } else {
    res.render('error', errData);
  }
};

export default errorHandler;
