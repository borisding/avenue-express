// sending page not found response when none of routes was matched
// @see: https://expressjs.com/en/4x/api.html#res.format
// eslint-disable-next-line no-unused-vars
const notFound = () => (req, res, next) => {
  const message = 'Page Not Found.';
  const code = 404;

  res.status(code);

  res.format({
    text: () => {
      res.send(message);
    },
    html: () => {
      res.render('404', { code, message });
    },
    json: () => {
      res.send({
        errors: [
          {
            name: 'notFound',
            code,
            message
          }
        ]
      });
    }
  });
};

export default notFound;
