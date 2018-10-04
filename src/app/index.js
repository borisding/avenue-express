import express from 'express';
import cors from 'cors';
import cons from 'consolidate';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import nunjucks from 'nunjucks';
import helmet from 'helmet';
import hpp from 'hpp';
import { DEV, ENV, SYSPATH } from '@config';
import { csrf, logger, errorHandler, notFound } from '@middlewares';
import bundles from '@assets/bundles.json';
import * as controllers from '@controllers';

const app = express();
const ext = ENV['VIEWS_EXT'];
const engine = cons[ENV['VIEWS_ENGINE']];
const views = [SYSPATH['views'], `${SYSPATH['views']}/partials`];

// nunjucks config to allow adding filters, global, etc
const njk = (cons.requires.nunjucks = nunjucks.configure(views, {
  express: app,
  watch: !!DEV
}));

// set global variables for nunjucks templates
njk.addGlobal('bundles', bundles);
njk.addGlobal('layout', `layout.${ext}`);

app
  // assign the views engine for mapping template
  .engine(ext, engine)
  // set default extension for view files
  .set('view engine', ext);

app
  .use(logger())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp())
  .use(cookieParser())
  .use(csrf({ cookie: true }), csrf.toLocal())
  .use(express.static(SYSPATH['public']));

// modular controllers (routers)
app
  .use('/', controllers.home)
  .use('/users', controllers.user)
  // when none is matched
  .use(notFound())
  // mount error handler last
  .use(errorHandler());

export default app;
