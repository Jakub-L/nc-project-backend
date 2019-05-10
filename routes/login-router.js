const loginRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { authenticateUser } = require('../controllers/login-controller');

loginRouter
  .route('/')
  .post(authenticateUser)
  .all(methodNotAllowed);

module.exports = loginRouter;
