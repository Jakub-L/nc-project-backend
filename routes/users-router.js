const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getAllUsers, getUser } = require('../controllers/users-controller');

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(getUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
