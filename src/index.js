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
import * as mid from '@middlewares';
import * as ctl from '@controllers';
import assets from '@build/webpack/assets';
import { DEV, ENV, SYSPATH } from '@config';

const app = express();
const ext = 'html';
const engine = cons[ENV['VIEWS_ENGINE']];
const views = [SYSPATH['VIEWS'], `${SYSPATH['VIEWS']}/partials`];

// session configuration for file storage
const FileStore = sessionFileStore(session);
const fileSession = () =>
  session({
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: ENV['SECRET_KEY'],
    cookie: { maxAge: ENV['COOKIE_MAXAGE'] }
  });

// nunjucks config to allow adding filters, global, etc
const njk = (cons.requires.nunjucks = nunjucks.configure(views, {
  express: app,
  trimBlocks: true,
  lstripBlocks: true,
  watch: !!DEV
}));

// set global variables for nunjucks templates
njk.addGlobal('layout', `layout.${ext}`);

// set custom filters for nunjucks templates
njk.addFilter('script', name => {
  if (!assets[name]) return null;
  if (assets[name].js) return assets[name].js;
});

njk.addFilter('style', name => {
  if (!assets[name]) return null;
  if (assets[name].css) return assets[name].css;
});

app
  // assign the views engine for mapping template
  .engine(ext, engine)
  // set default extension for view files
  .set('view engine', ext);

app
  .use(mid.logger())
  .use(compression())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(fileSession())
  .use(mid.csrf({ cookie: true }), mid.csrf.toLocal())
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(express.static(SYSPATH['PUBLIC']));

app
  .use('/', ctl.home)
  .use('/users', ctl.user)
  // when none is matched
  .use(mid.notFound())
  // mount error handler last
  .use(mid.errorHandler());

export default app;
