import csurf from 'csurf';

// config for CSRF, (default: cookie)
const csrf = () => csurf({ cookie: true });

// make `csrfToken` accessible in view templates, conveniently
csrf.toLocal = () => (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  return next();
};

export default csrf;
