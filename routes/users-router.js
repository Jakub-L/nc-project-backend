const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
  getAllUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require('../controllers/users-controller');

usersRouter
  .route('/')
  .get(getAllUsers)
  .all(methodNotAllowed);

usersRouter
  .route('/:user_id')
  .get(getUser)
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
