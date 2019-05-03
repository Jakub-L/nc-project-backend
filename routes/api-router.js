const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/users', usersRouter);

apiRouter.use('/pins', pinsRouter);

module.exports = apiRouter;
