import { Router } from 'express';

// GET method for index action
export function index(req, res) {
  res.render('index');
}

// simple route for bare controller
const router = Router();

router.get('/', index);

export default router;
