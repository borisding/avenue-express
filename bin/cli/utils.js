const fs = require('fs');
const prettier = require('prettier');
const { syspath } = require('@config');

function prettyFormat(key, options) {
  if (!options.name) {
    return;
  }

  const sequelizeConfig = require(`${syspath.root}/.sequelizerc`);
  if (sequelizeConfig[key]) {
    const filePath = `${sequelizeConfig[key]}/${options.name}.js`;
    const text = fs.readFileSync(filePath, 'utf8');

    prettier
      .resolveConfig(filePath)
      .then(options => {
        const formatted = prettier.format(text, {
          ...options,
          parser: 'babel'
        });
        fs.writeFileSync(filePath, formatted, { encoding: 'utf8' });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = {
  prettyFormat
};
