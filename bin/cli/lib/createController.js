const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp-promise');
const slash = require('slash');
const { syspath } = require('@config');
const { print } = require('@utils');

async function createController(controller, options) {
  try {
    const SUFFIX = 'Controller';
    const pathToControllers = slash(
      path.join(`${syspath.app}/controllers`, options.module)
    );

    let controllerFile = `${pathToControllers}/${controller.toLowerCase()}${SUFFIX}.js`;

    if (!options.suffix) {
      controllerFile = controllerFile.replace(SUFFIX, '');
    }

    await mkdirp(pathToControllers);

    if (fs.existsSync(controllerFile) && !options.force) {
      return print.warn(
        `([${controllerFile}] already exists. Use option --force to overwrite.)`
      );
    }

    const fileData = fs.readFileSync(
      `${syspath.bin}/cli/templates/controller.${
        options.bare ? 'bare' : 'resource'
      }.txt`,
      'utf8'
    );

    fs.writeFileSync(controllerFile, fileData);
    print.info(`Generated controller: ${controllerFile}`, 0);
  } catch (err) {
    print.error(err);
  }
}

module.exports = createController;
