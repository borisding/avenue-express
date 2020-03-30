const express = require('express');
const cors = require('cors');
const cons = require('consolidate');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const nunjucks = require('nunjucks');
const helmet = require('helmet');
const hpp = require('hpp');

const { isDev, syspath } = require('@config');
const mid = require('@middlewares');
const ctl = require('@controllers');
const assets = require('@assets');

const app = express();
const ext = 'html';
const engine = cons[process.env.VIEWS_ENGINE];
const views = [`${syspath.app}/views`, `${syspath.app}/views/partials`];

// nunjucks config to allow adding filters, global, etc
cons.requires.nunjucks = nunjucks;
const njk = cons.requires.nunjucks.configure(views, {
  express: app,
  trimBlocks: true,
  lstripBlocks: true,
  // no cache in `development` mode
  noCache: !!isDev,
  // watch changes in `development` mode
  watch: !!isDev
});

// set global variables for nunjucks templates
njk.addGlobal('layout', `layout.${ext}`);
njk.addGlobal('production', !isDev);

// set custom filters for nunjucks templates
njk.addFilter('script', name => {
  if (!assets[name]) return null;
  if (assets[name].js) return assets[name].js;
});

njk.addFilter('style', name => {
  if (!assets[name]) return null;
  if (assets[name].css) return assets[name].css;
});

// session configuration for file storage
const FileStore = sessionFileStore(session);
const sessionFile = () =>
  session({
    store: new FileStore({ path: `${syspath.storage}/sessions` }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) }
  });

app
  // assign the views engine for mapping template
  .engine(ext, engine)
  // set default extension for view files
  .set('view engine', ext);

app
  .use(mid.httpLogger())
  .use(compression())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(sessionFile())
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
