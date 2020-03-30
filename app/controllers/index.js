// entry file of controllers (the routes)
// where we export all controllers to be used

module.exports = {
  home: require('./homeController'),
  user: require('./userController')
};
