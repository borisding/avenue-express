// exposed configuration for project usage
module.exports = {
  // core system paths of application
  syspath: require('./syspath'),

  // is development environment
  isDev: require('isdev')
};
