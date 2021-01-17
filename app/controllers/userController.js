const { Router } = require('express');

const userProps = {
  title: 'Users',
  page: 'users'
};

// GET method for index action
function index(req, res) {
  res.render('users', {
    ...userProps,
    username: 'Guest'
  });
}

// GET method for create action
function create(req, res, next) {
  next();
}

// POST method for store action
function store(req, res, next) {
  next();
}

// GET method for show action
function show(req, res, next) {
  next();
}

// GET method for edit action
function edit(req, res, next) {
  next();
}

// PUT method for update action
function update(req, res, next) {
  next();
}

// DELETE method for destroy action
function destroy(req, res, next) {
  next();
}

// respective routes based on the http verbs
// match the actions of generated resource controller, respectively
const router = Router();

// resource routes based on the http verbs
// and the route function to be called
router
  .get('/', index)
  .get('/create', create)
  .get('/:id', show)
  .get('/:id/edit', edit)
  .post('/', store)
  .put('/:id', update)
  .delete('/:id', destroy);

module.exports = router;
