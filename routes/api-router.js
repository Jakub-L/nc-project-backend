const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const usersRouter = require('./users-router');
const sitesRouter = require('./sites-router');
const pinsRouter = require('./pins-router');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/users', usersRouter);

apiRouter.use('/sites', sitesRouter);

apiRouter.use('/pins', pinsRouter);

module.exports = apiRouter;
