import { Router } from 'express';

// GET method for index action
export function index(req, res) {
  res.render('users', { username: 'Guest' });
}

// GET method for create action
export function create(req, res, next) {
  next();
}

// POST method for store action
export function store(req, res, next) {
  next();
}

// GET method for show action
export function show(req, res, next) {
  next();
}

// GET method for edit action
export function edit(req, res, next) {
  next();
}

// PUT method for update action
export function update(req, res, next) {
  next();
}

// DELETE method for destroy action
export function destroy(req, res, next) {
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

export default router;
