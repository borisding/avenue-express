import express from 'express';
import isDev from 'isdev';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import ejsLayouts from 'express-ejs-layouts';
import errorHandler from 'errorhandler';
import { sysenv, syspath } from '@config';
import { csrf, logger } from '@middlewares';

const app = express();

app
  .set('view engine', sysenv['VIEW_ENGINE'])
  .set('views', [syspath.views, `${syspath.views}/partials`])
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
  .use(csrf.signed(app))
  .use(express.static(syspath.dist));

if (isDev) {
  app.use(errorHandler());
}

app.get('/', (req, res) => {
  res.render('index');
});

export default app;
