import express from 'express';
import helmet from 'helmet';
import cons from 'consolidate';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
//import ejsLayouts from 'express-ejs-layouts';
import { ENV, SYSPATH } from '@config';
import { csrf, logger, errorHandler } from '@middlewares';
import * as controllers from '@controllers';

const app = express();

app
  // assign the env's template engine to .html files
  .engine('html', cons[ENV['TEMPLATE_ENGINE']])
  // set .html as the default extension
  .set('view engine', 'html')
  .set('views', [SYSPATH['views'], `${SYSPATH['views']}/partials`]);

app
  //.use(ejsLayouts)
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
