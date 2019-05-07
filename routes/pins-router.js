const pinsRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
  getAllPins,
  getPin,
  postPin,
  patchPin,
  deletePin,
} = require('../controllers/pins-controller');

pinsRouter
  .route('/')
  .get(getAllPins)
  .all(methodNotAllowed);

pinsRouter
  .route('/:pin_id')
  .get(getPin)
  .post(postPin)
  .patch(patchPin)
  .delete(deletePin)
  .all(methodNotAllowed);

module.exports = pinsRouter;
