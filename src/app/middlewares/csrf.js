import csurf from 'csurf';

// return `csurf` by passing `options` to it
// no options provided by default
const csrf = (options = {}) => csurf(options);

// make `csrfToken` accessible in view templates, conveniently
csrf.toLocal = () => (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

export default csrf;
