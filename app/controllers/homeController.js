const { Router } = require('express');

const homeProps = {
  title: 'Home',
  pageStyle: 'home',
  pageScript: 'home'
};

// GET method for index action
function index(req, res) {
  res.render('home', homeProps);
}

// simple route for bare controller
const router = Router();

router.get('/', index);

module.exports = router;
