const express = require('express');
const eta = require('eta');
const chalk = require('chalk');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');

const { isDev, syspath } = require('@config');
const assets = require('@public/assets');
const middlewares = require('@middlewares');
const controllers = require('@controllers');

const app = express();
app.locals.isProd = !isDev;
app.locals.assets = assets;

// app view engine and directories config
eta.configure({
  cache: !isDev
});

app
  .engine('eta', eta.renderFile)
  .set('view engine', 'eta')
  .set('views', [`${syspath.app}/views`]);

app
  .use(helmet({ contentSecurityPolicy: false }))
  .use(compression())
  .use(cookieParser())
  .use(middlewares.httpLogger({ isDev }))
  .use(middlewares.csrf({ cookie: true }))
  .use(middlewares.csrf.toLocal())
  .use(middlewares.htmlMinifier({ isDev }))
  .use(express.json({ limit: '1mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp())
  .use(express.static(syspath.public))
  .use('/static/images', express.static(`${syspath.assets}/images`))
  .get('/favicon.ico', (req, res) => res.status(204));

app
  .use('/', controllers.home)
  .use('/users', controllers.user)
  .use(middlewares.notFound())
  .use(middlewares.errorHandler());

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
  console.info(chalk.cyan(`App Server is up! Listening: ${PORT}`));
});
