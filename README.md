## avenue-express

Express MVC application starter for getting shit done.

## Project Structure
Below is a brief description of project structure in tree-view:

```bash
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

## Controllers
- Controller file can be generated via the following command:

```bash
# generate targeted controller file with provided inputs
node avenue new:controller <controller> [options]

# to see more of the subcommand line:
node avenue new:controller --help
```

- This starter borrows the same action names from [Laravel](https://laravel.com) framework for its resource controller:

| HTTP Verb     | URI                                          | Action | 
| --------------| ---------------------------------------------|------- |
| GET           | `/users`                                     | index  |
| GET           | `/users/create`                              | create |
| POST          | `/users`                                     | store  |
| GET           | `/users/:id`                                 | show   |
| GET           | `/users/:id/edit`                            | edit   |
| PUT           | `/users/:id`                                 | update |
| DELETE        | `/users/:id`                                 | destroy|

- For generated bare controller, there will be only one `index` action in controller file, eg:

```js
import { Router } from 'express';

// GET method for index action
export function index(req, res) {
  res.render('home');
}

// simple route for bare controller
const router = Router();

router.get('/', index);

export default router;
```