const prettierConfig = require('./prettier.config');

module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'selector-max-id': 1,
    'selector-class-pattern': null,
    'prettier/prettier': [true, prettierConfig]
  }
};
