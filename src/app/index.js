import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import ejsLayouts from 'express-ejs-layouts';
import { sysenv, syspath } from '@config';
import { csrf, logger, errorHandler } from '@middlewares';

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
  .use(csrf.toLocal())
  .use(express.static(syspath.dist));

app.get('/', (req, res) => {
  res.render('index');
});

app.use(errorHandler());

export default app;
