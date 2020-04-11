const express = require('express');
const handlebars = require('express-hbs');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

const { isDev, syspath } = require('@config');
const mid = require('@middlewares');
const ctl = require('@controllers');
const assets = require('@assets');

const hbs = handlebars.express4({
  defaultLayout: `${syspath.app}/views/layouts/main`
});

handlebars.registerHelper('style', name => {
  if (!assets[name]) return;
  const cssFile = assets[name]['css'];
  const pathToStyle = `<link href="${cssFile}" rel="stylesheet">`;
  return new handlebars.SafeString(pathToStyle);
});

handlebars.registerHelper('script', name => {
  if (!assets[name]) return;
  const jsFile = assets[name]['js'];
  const pathToScript = `<script src="${jsFile}" defer></script>`;
  return new handlebars.SafeString(pathToScript);
});

const app = express();
app.locals.isProduction = !isDev;

app
  .engine('hbs', hbs)
  .set('view engine', 'hbs')
  .set('views', [
    `${syspath.app}/views`,
    `${syspath.app}/views/layouts`,
    `${syspath.app}/views/partials`
  ]);

app
  .use(mid.httpLogger())
  .use(compression())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(mid.sessionFileStore())
  .use(mid.csrf({ cookie: true }), mid.csrf.toLocal())
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(express.static(syspath.public))
  .get('/favicon.ico', (req, res) => res.status(204));

app
  .use('/', ctl.home)
  .use('/users', ctl.user)
  // when none is matched
  .use(mid.notFound())
  // mount error handler last
  .use(mid.errorHandler());

module.exports = app;
