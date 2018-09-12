import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import ejsLayouts from 'express-ejs-layouts';
import { ENV, SYSPATH } from '@config';
import { csrf, logger, errorHandler } from '@middlewares';
import * as controllers from '@controllers';

const app = express();

app
  .set('view engine', ENV['VIEW_ENGINE'])
  .set('views', [SYSPATH['views'], `${SYSPATH['views']}/partials`]);

app
  .use(ejsLayouts)
  .use(logger())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }))
  .use(cookieParser())
  .use(hpp())
  .use(csrf())
  .use(csrf.toLocal())
  .use(express.static(SYSPATH['dist']));

// modular controllers (routers)
app.use('/', controllers.home);
app.use('/users', controllers.users);

// mount error handler last
app.use(errorHandler());

export default app;
