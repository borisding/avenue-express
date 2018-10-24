## Avenue-Express

<p>
<a href="https://github.com/borisding/avenue-express"><img src="https://img.shields.io/github/release/borisding/avenue-express.svg" alt="Release Version"></a>
<a href="https://raw.githubusercontent.com/borisding/avenue-express/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
<a href="https://travis-ci.org/borisding/avenue-express"><img src="https://travis-ci.org/borisding/avenue-express.svg?branch=master" alt="Travis CI Build"></a>
</p>

This starter aims to be productive and good fit for MVC web development and also, traditional client-side single page application, powered by [Express](https://expressjs.com/), [Vue.js](https://vuejs.org/) and [webpack](https://webpack.js.org/).

> If you're looking for Server-Side Rendering (SSR) web starter kit, please also check out [universsr](https://github.com/borisding/universsr).

## Requirement

This project starter should be working as expected with the following minimal version of Node/NPM, respectively:

| Dependency |  Version  |
| ---------- | :-------: |
| Node       | >= v8.0.0 |
| NPM        | >= v5.0.0 |

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

```bash
# build for production ready and start server
npm run build && npm start
```

To run tests:

**Test**

```bash
# only execute `config` script when `env-properties.json` is not available
npm run config

npm test
```

## Project Structure

Below is a brief description of project structure in tree-view:

```
├─.babelrc                          # default babel configuration
├─.sequelizerc                      # Sequelize configuration for CLI
├─.travis.yml                       # config file for Travis build workflow
├─avenue.js                         # CLI entry file for the app
├─esm.js                            # ESM loader and module alias hook
├─index.js                          # expose Express server file
├─package-lock.json                 # NPM package lock file
├─package.json                      # NPM package file
| ...
├─utils                             # contains all utility files
├─tests                             # contains all mocks and tests
|   ├─mocks                         # contains all mock files
|   ├─components                    # contains all tests for Vue SFCs
├─src                               # parent folder of all source files
|  ├─index.js                       # entry file for Express framework
|  ├─views                          # contains respective view templates
|  |   ├─layout.html                # default layout template for the app
|  |   ├─partials                   # contains respective partial view templates
|  |   ├─macros                     # contains reusable helpers for views
|  ├─models                         # contains all model files, default is Sequelize models
|  ├─middlewares                    # contains respective Express middlewares
|  ├─controllers                    # contains respective Express routes (controllers)
|  ├─assets                         # parent folder of all assets
|  |   ├─scss                       # contains all SCSS source files
|  |   ├─js                         # contains all JS module source files
|  |   ├─img                        # contains all images
|  |   ├─components                 # contains all Vue's Single File Components (SFCs)
├─sessions                          # default folder for session file storage
├─public                            # contains production ready assets/files
├─logs                              # any log files, such as http request logs
├─database                          # Sequelize's migration folder
|    ├─seeders                      # contains all database seed files
|    ├─migrations                   # contains all database migration files
├─config                            # contains all app configurations
├─build                             # contains webpack and build scripts
|   ├─webpack                       # contains webpack configuration
|   ├─scripts                       # contains all script files for build workflow
├─bin                               # parent folder for server and CLI
|  ├─server.js                      # Express server file
|  ├─cli                            # folder for Avenue command-line interface
```

## Project Configuration

- Project configuration should be placed in `./config` directory. By default, this starter comes with an example `.env.example` required for the app usage. Please rename the file to `.env` to serve your actual app configuration.

- This starter relies on `dotenv` package to load environment variables from `.env` into Node's `process.env`. You should always define new environment variables in `.env`.

- When environment values changed, we can execute the following script to load new changes into `process.env`:

```bash
npm run config
```

- After script is executed, it will also generate `env-properties.json` to be required in `./config/index.js`. We should not amend directly any of the environment properties, which supposed to be synced with `.env`

- To use the environment properties, import file as follows:

```js
import { ENV } from "@config";

// print PORT value as configured in `.env`
console.log(ENV["PORT"]);
```

> You should never commit `.env` file to version control. Please [check out](https://www.npmjs.com/package/dotenv#faq) the FAQ section on `dotenv` page for more details.

- Besides `ENV` object, it also exposes `DEV`, `DB`, `SYSPATH` respectively:

```js
import { DEV, DB, SYSPATH } from "@config";

// check if we're in development environment
if (DEV) {
  console.log("We are in development environment.");
}

// get development's database config
console.log(DB["development"]);

// print absolute path of `public` directory
// defined system paths can be found in `syspath.js`
console.log(SYSPATH["PUBLIC"]);
```

## Avenue CLI

- This stater comes with a light CLI to perform some routine tasks, such as controller file creation, Sequelize database migration, etc.

- To see available commands:

```bash
$ node avenue --help
```

## Controllers

- Controller file can be generated via the following command:

```bash
# generate targeted controller file with provided inputs
node avenue new:controller <controller> [options]

# example for `userController` in `./src/controllers`
node avenue new:controller user

# to see more options of the subcommand line:
node avenue new:controller --help
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

```js
import { Router } from "express";

// GET method for index action
export function index(req, res) {
  res.render("home");
}

// simple route for bare controller
const router = Router();

router.get("/", index);

export default router;
```

## Models

- By default, this starter uses [Sequelize](http://docs.sequelizejs.com/) ORM for dealing with SQL databases.

- For instance, to create a new `User` model via Avenue CLI:

```bash
node avenue orm model:generate --name User --attributes firstName:string,lastName:string,email:string
```

- Once `user.js` is created in `./src/models` and migration performed, we can access `User` model with `db` object in `./src/models/index.js`:

```js
import db from '@models';

...
// eg: find all users
db.User.findAll().then(users => {
  console.log(users);
});
...
```

- Basically, the internal `orm` command executes Sequelize CLI commands under the hood, which is installed locally in `./node_modules`:

```bash
node avenue orm <followed by Sequelize CLI command>

# to see help or version, just omit the `--`, as follows:
node avenue orm help
```

> Be sure to go through with the [Sequelize Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) page.

(WIP...)
