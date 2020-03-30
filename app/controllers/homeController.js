const { Router } = require('express');

// GET method for index action
function index(req, res) {
  res.render('home');
}

// simple route for bare controller
const router = Router();

router.get('/', index);

module.exports = router;
