import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import mkdirp from 'mkdirp-promise';
import { print } from '@utils';
import { syspath } from '@config';

const fileExist = target => fs.existsSync(target);
const CONTROLLER_SUFFIX = 'Controller';

export default async function createController(controller, options) {
  try {
    const pathToControllers = path.join(syspath.controllers, options.module);
    const routerName = (controller = controller.toLowerCase());
    const routerPath = !options.path ? pluralize(routerName) : options.path;
    const controllerFile = `${pathToControllers}/${controller}${CONTROLLER_SUFFIX}.js`;

    await mkdirp(pathToControllers);

    if (fileExist(controllerFile) && !options.force) {
      return print.warn(
        `([${controllerFile}] already exists. Use option --force to overwrite.)`
      );
    }

    const fileData = fs.readFileSync(
      `${syspath.bin}/cli/templates/controller${
        options.bare ? '.bare' : '.resource'
      }.txt`,
      'utf8'
    );

    fs.writeFileSync(controllerFile, fileData.replace(/<path>/gi, routerPath));
    print.info('Generated controller: %s', 0, [controllerFile]);
  } catch (err) {
    print.error(err);
  }
}
