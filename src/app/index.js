import express from 'express';
import isDev from 'isdev';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import ejsLayouts from 'express-ejs-layouts';
import errorHandler from 'errorhandler';
import { env, syspath } from '@config';
import { logger } from '@middlewares';

const app = express();

app
  .set('view engine', 'ejs')
  .set('views', [syspath.views, `${syspath.views}/partials`])
  .use(ejsLayouts)
  .use(logger())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp())
  .use(cookieParser())
  .use(express.static(syspath.dist));

if (isDev) {
  app.use(errorHandler());
}

app.get('/', (req, res, next) => {
  res.render('index');
});

export default app;
