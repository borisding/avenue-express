const { Router } = require('express');

const pageAssets = {
  pageStyle: 'home',
  pageScript: 'home'
};

// GET method for index action
function index(req, res) {
  res.render('home', {
    title: 'Home',
    ...pageAssets
  });
}

// simple route for bare controller
const router = Router();

router.get('/', index);

module.exports = router;
