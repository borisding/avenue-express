## Avenue-Express

<p>
<a href="https://github.com/borisding/avenue-express"><img src="https://img.shields.io/github/release/borisding/avenue-express.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/avenue-express/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/avenue-express"><img src="https://travis-ci.org/borisding/avenue-express.svg?branch=master" alt="Travis CI Build"></a>
<a href="https://david-dm.org/borisding/avenue-express"><img src="https://david-dm.org/borisding/avenue-express/status.svg" alt="Dependencies"></a>
<a href="https://david-dm.org/borisding/avenue-express?type=dev"><img src="https://david-dm.org/borisding/avenue-express/dev-status.svg" alt="Dev Dependencies"></a>
</p>

Opinionated project starter aims to be productive and good fit for Node.js web development with MVC architectural pattern powered by [Express](https://expressjs.com/), [Vue.js](https://vuejs.org/) and [webpack](https://webpack.js.org/).

> If you're looking for Server-Side Rendering (SSR) web starter kit, please also check out [universsr](https://github.com/borisding/universsr).

## Table of Contents

- [Requirement](#requirement)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure) / [Configuration](#configuration) / [CLI and ORM](#cli-and-orm)
- [Controllers](#controllers) / [Models](#models) / [Views](#views)
- [Frontend Assets](#frontend-assets)
- [Session Management](#session-management)
- [Nodemon and Webpack](#nodemon-and-webpack)
- [Lint Checks and Formatting](#lint-checks-and-formatting)
- [Logging](#logging)
- [Unit Testing](#unit-testing)
- [Changelog](#changelog)
- [License](#license)

## Requirement

This project starter should be working as expected with the following minimal version of Node/NPM, respectively:

| Dependency |  Version   |
| ---------- | :--------: |
| Node       | >= v10.0.0 |
| NPM        | >= v5.6.0  |

**[Back to top](#table-of-contents)**

## Quick Start

1. Clone the git repository into your new project folder and install required dependencies by running the command below:

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/avenue-express.git my-project

# install project dependencies
cd my-project && npm install
```

2. Running application by executing one of the following scripts:

**Development**

```bash
npm run dev
```

**Production**

Copy `.env.development` to `./config/dotenv` folder as `.env` for production usage:

```bash
cp config/dotenv/.env.development config/dotenv/.env
```

Change environment variables in `.env` to serve your app. Avoid using the same port for both development and production.

```bash
# build for production ready and start server
npm run build && npm start
```

To run tests:

**Test**

```bash
npm test
```

**[Back to top](#table-of-contents)**

## Project Structure

Below is a overview of project structure in tree-view:

```
├─.sequelizerc                      # Sequelize configuration for CLI
├─.travis.yml                       # config file for Travis build workflow
├─avenue.js                         # CLI entry file for the app
├─babel.config.js                   # default babel configuration
├─env.loader.js                     # .env file loader with `dotenv` and `dotenv-expand`
├─index.js                          # expose Express server file
├─jest.config.js                    # config file for Jest testing framework
├─package-lock.json                 # NPM package lock file
├─package.json                      # NPM package file
├─postcss.config.js                 # config file for PostCSS
├─prettier.config.js                # config file for Prettier formatter
├─stylelint.config.js               # config file for Stylelint
├─webpack.config.js                 # webpack bundler's configuration
| ...
├─utils                             # contains all utility files
├─tests                             # contains all mocks and tests
├─storage                           # contains database, logs, sessions files, coverage reports
├─scripts                           # contains CLI/internal operation scripts
├─public                            # contains production ready assets/files
├─node_modules                      # contains required node packages
├─logger                            # contains winston logger for the app
├─config                            # contains project .env files, jest and other configs
├─app                               # parent folder of all app source files
|  ├─index.js                       # entry file for Express framework
|  ├─server.js                      # Express HTTP web server
|  ├─views                          # contains respective view layout templates
|  |   ├─layouts                    # default layout template for the app
|  |   ├─partials                   # contains respective partial view templates
|  |   ├─components                 # contains all Vue's Single File Components (SFCs)
|  ├─models                         # contains all model files, default is Sequelize models
|  ├─middlewares                    # contains respective Express middlewares
|  ├─controllers                    # contains respective Express routes (controllers)
├─assets                            # parent folder of all assets
|   ├─scss                          # contains all SCSS source files
|   ├─js                            # contains all JS module source files
|   ├─images                        # contains all images
```

**[Back to top](#table-of-contents)**

## Configuration

**Environment Variables**

- `dotenv` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.loader.js` file. The .env is environment sepecific and is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |    In Source Control    |
| ------------------ | ----------- | :---------------------: |
| `.env.test`        | test        |           Yes           |
| `.env.development` | development |           Yes           |
| `.env`             | production  | No (Need to create new) |

- Defined custom environment variables can be accessed via `process.env.[VARIABLE_NAME]`, for in instance:

```js
process.env.PORT; // this will give us PORT value
```

- Only those variables we defined in `.env*` file will get stringified for webpack.DefinePlugin for client build process, which is useful when come to client-side usage.

**Others**

- `isDev` and `syspath` are also exposed in `./config/index.js` for project usage:

```js
const { isDev, syspath } = require('@config');

// checking for development environment
if (isDev) {
  // do something only for development mode
}

// expose project core directories, eg: absolute path of `app`
console.log(syspath.app);
```

- Feel free to add more configuration and used upon project needs.

**[Back to top](#table-of-contents)**

## CLI and ORM

- This stater comes with a light CLI to perform some routine tasks, such as controller file creation, Sequelize database migration, etc.

- To see available commands:

```bash
$ node avenue --help
```

**[Back to top](#table-of-contents)**

## Controllers

- Controller file can be generated via the following command:

```bash
# generate targeted controller file with provided inputs
node avenue controller:new <controller> [options]

# example for `userController` in `./app/controllers`
node avenue controller:new user

# to see more options of the subcommand line:
node avenue controller:new --help
```

- This starter borrows the same action names from [Laravel](https://laravel.com) framework for its resource controller to perform typical CRUD operations:

| HTTP Verb | URI               | Action    |
| --------- | ----------------- | --------- |
| GET       | `/users`          | `index`   |
| GET       | `/users/create`   | `create`  |
| POST      | `/users`          | `store`   |
| GET       | `/users/:id`      | `show`    |
| GET       | `/users/:id/edit` | `edit`    |
| PUT       | `/users/:id`      | `update`  |
| DELETE    | `/users/:id`      | `destroy` |

- For generated bare controller, there is only one `index` action in controller file, eg:

```bash
# generate bare controller file
node avenue controller:new <controller> --bare
```

```js
const { Router } = require('express');

// GET method for index action
export function index(req, res) {
  res.render('home');
}

// simple route for bare controller
const router = Router();

router.get('/', index);

export default router;
```

**[Back to top](#table-of-contents)**

## Models

- By default, this starter uses [Sequelize](http://docs.sequelizejs.com/) ORM for dealing with relational databases (default dialect is `mysql`).

- For instance, to create a new `User` model via Avenue CLI:

```bash
node avenue orm model:generate --name User --attributes firstName:string,lastName:string,email:string
```

- Once `user.js` is created in `./app/models` and migration performed, we can access `User` model with `db` object in `./app/models/index.js`:

```js
const db = require('@models');

...
// eg: find all users
db.User.findAll().then(users => {
  console.log(users);
}).catch(err => {
  // error handling
});
...
```

- To do migration, eg:

```js
node avenue orm db:migrate
```

> By default, `orm` command will load env variables from `.env.development` file before running CLI tasks in `development` mode. For other environments, please use `orm:test` and `orm:prod` commands instead for both `test` and `production`, respectively.

- Basically, the internal `orm` command executes Sequelize CLI commands under the hood, which is installed locally in `./node_modules`:

```bash
node avenue orm <followed by Sequelize CLI command>

# to see help or version, just omit the `--`, as follows:
node avenue orm help
```

> Be sure to go through with the [Sequelize Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) page.

**[Back to top](#table-of-contents)**

## Views

- All view templates can be found in `./app/views`. It uses [`Express handlebars`](https://github.com/TryGhost/express-hbs) as default templating engine.

- The default template file extension is `hbs`.

- `main.hbs` is the default page layout to be extended by partial views. Feel free to create new layout templates based on the needs.

**[Back to top](#table-of-contents)**

## Frontend Assets

- All asset source files (js, css/scss, images, etc) are placed in `./assets`. The generated assets such as JS bundles and final CSS outputs will be kept in `./public` folder.

- After runnig webpack build process, `./public/assets.js` will be generated with `assets-webpack-plugin`, which consists a list of assets in key/value pairs with the paths included. This allows us to include targeted asset files in respective module view templates by using defined handlebars helpers.

- To keep project modular, it's recommended to use the same naming for `.js` and `.scss` source files. For instance, we have partial view called `user.hbs`, which having some JS code and style need to be applied. We can create `user.js` and `user.scss` respectively for webpack to look up and include it as part of entry files for bundling.

- `.vue` components are placed in `./views/components` folder for Vue loaders to process during webpack build process. Please go through with the webpack config on rules section.

- Vendor chunk will be created with the following config in webpack:

```js
...
optimization: {
    ...
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor'
        }
      }
    }
  }
...
```

- [Bulma](https://bulma.io/) is also chosen as default CSS framework for this starter. Please check out the [guide](https://bulma.io/documentation/customize/) to learn about customization.

**[Back to top](#table-of-contents)**

## Session Management

- This starter comes with default file storage (`session-file-store`) for session management. Please take a look at `./app/index.js`.

- Feel free to use different storage for session management. For instance, storing sessions with Redis:

```js
const session = require('express-session');
const connectRedis = require('connect-redis');
const Redis = require('ioredis'); // redis client we use for

...
const RedisStore = connectRedis(session);
// please check ioredis docs for more details
const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD // password, if any
});

app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }
}));
...
```

**[Back to top](#table-of-contents)**

## Nodemon and Webpack

- This starter uses `nodemon-webpack-plugin` together with webpack to run development server for monitoring file changes. Be sure to check out `NodemonPlugin` config in webpack file.

- Meanwhile, webpack's watch mode is also turned on for development to monitor frontend asset changes and get reflected upon updates.

**[Back to top](#table-of-contents)**

## Lint Checks and Formatting

- [ESLint](https://eslint.org/) and [Styelint](https://stylelint.io/) are being used for JS and SCSS lint checks, respectively. [Prettier](https://prettier.io/) is also used in conjunction with ESLint plugins for code formatting.

- There are several pre-defined lint rules in respective individual configuration files. Feel free to add/remove any of them for project needs.

- There is also `.eslintrc` config file in `./app/models` folder to overwrite the default rules in `package.json`. This to avoid lint check error in any model files that is generated via Sequelize CLI.

**[Back to top](#table-of-contents)**

## Logging

- This starter uses `winston` as default logger for logging http request and exception error logs. Please check out the logger file (`./logger/winston.js`) with default config.

```js
// example of using winston logger
const { logger } = require('@logger');

logger.info('This log message is for info level');
```

- `httpLogger` custom middleware is also provided, where `morgan` is used with winston for logging http request. To use http logger:

```js
// example of using http logger middleware
...
const { httpLogger } = require('@middlewares');

app.use(httpLogger());
...
```

- All log files will go into `./storage/logs` folder.

**[Back to top](#table-of-contents)**

## Unit Testing

- All test files should reside in `./tests` folder. [Jest](https://jestjs.io/) framework is used for running tests. All Jest related config can be seen under `jest.config.js` file.

- Besides, `vue-jest` and `jest-serializer-vue` are also included for testing `.vue` components.

**[Back to top](#table-of-contents)**

## Changelog

All notable changes made to the project will be documented on [release page](https://github.com/borisding/avenue-express/releases). Always using the latest version for new project.

This project adheres to [Semantic Versioning](http://semver.org/).

**[Back to top](#table-of-contents)**

## License

[MIT](https://raw.githubusercontent.com/borisding/avenue-express/master/LICENSE)
