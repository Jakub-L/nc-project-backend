const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
  authenticateUser,
  getAllUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require('../controllers/users-controller');

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:user_id')
  .get(getUser)
  .patch(patchUser)
  .delete(deleteUser)
  .all(methodNotAllowed);

usersRouter
  .route('/login')
  .post(authenticateUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
