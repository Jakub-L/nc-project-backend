const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
<<<<<<< HEAD
  authenticateUser,
=======
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
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

<<<<<<< HEAD
usersRouter
  .route('/login')
  .post(authenticateUser)
  .all(methodNotAllowed);

=======
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
module.exports = usersRouter;
