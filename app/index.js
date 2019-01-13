import express from 'express';
import cors from 'cors';
import cons from 'consolidate';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import nunjucks from 'nunjucks';
import helmet from 'helmet';
import hpp from 'hpp';

import { isDev, syspath } from '@config';
import * as mid from '@middlewares';
import * as ctl from '@controllers';
import assets from './assets';

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

export default app;
