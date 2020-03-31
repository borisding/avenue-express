const prettierConfig = require('./prettier.config');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-console': 0,
    'no-global-assign': 0,
    'prettier/prettier': ['error', prettierConfig]
  }
};
