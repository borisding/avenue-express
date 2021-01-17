const express = require('express');
const eta = require('eta');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

const { isDev, syspath } = require('@config');
const assets = require('@public/assets');
const mid = require('@middlewares');
const ctl = require('@controllers');

eta.configure({
  cache: !isDev
});

const app = express();
app.locals.isProd = !isDev;
app.locals.assets = assets;

// app view engine and directories config
app
  .engine('eta', eta.renderFile)
  .set('view engine', 'eta')
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
