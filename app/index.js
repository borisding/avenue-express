const express = require('express');
const handlebars = require('express-hbs');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

const { isDev, syspath } = require('@config');
const builtAssets = require('@public/assets');
const mid = require('@middlewares');
const ctl = require('@controllers');

const hbs = handlebars.express4({
  partialsDir: [`${syspath.app}/views/partials`],
  defaultLayout: `${syspath.app}/views/layouts/main`
});

handlebars.registerHelper('style', name => {
  if (!builtAssets[name]) return;
  const cssFile = builtAssets[name]['css'];
  const pathToStyle = `<link href="${cssFile}" rel="stylesheet">`;
  return new handlebars.SafeString(pathToStyle);
});

handlebars.registerHelper('script', name => {
  if (!builtAssets[name]) return;
  const jsFile = builtAssets[name]['js'];
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
  .use(mid.httpLogger({ isDev }))
  .use(helmet())
  .use(cors())
  .use(compression())
  .use(cookieParser())
  .use(mid.sessionFileStore({ syspath }))
  .use(mid.csrf({ cookie: true }), mid.csrf.toLocal())
  .use(mid.htmlMinifier({ isDev }))
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(express.static(syspath.public))
  .use('/static/images', express.static(`${syspath.assets}/images`))
  .get('/favicon.ico', (req, res) => res.status(204));

app
  .use('/', ctl.home)
  .use('/users', ctl.user)
  // when none is matched
  .use(mid.notFound())
  // mount error handler last
  .use(mid.errorHandler());

module.exports = app;
