import express from 'express';
import cors from 'cors';
import cons from 'consolidate';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import nunjucks from 'nunjucks';
import helmet from 'helmet';
import hpp from 'hpp';
import * as controllers from '@controllers';
import assets from '@build/webpack/assets';
import { DEV, ENV, SYSPATH } from '@config';
import { csrf, logger, session, errorHandler, notFound } from '@middlewares';

const app = express();
const ext = 'html';
const engine = cons[ENV['VIEWS_ENGINE']];
const views = [SYSPATH['VIEWS'], `${SYSPATH['VIEWS']}/partials`];

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
  .use(logger())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(session())
  .use(compression())
  .use(csrf({ cookie: true }), csrf.toLocal())
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp())
  .use(express.static(SYSPATH['PUBLIC']));

// modular controllers (routers)
app
  .use('/', controllers.home)
  .use('/users', controllers.user)
  // when none is matched
  .use(notFound())
  // mount error handler last
  .use(errorHandler());

export default app;
