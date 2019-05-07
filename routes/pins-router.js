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
  .post(postPin)
  .all(methodNotAllowed);

pinsRouter
  .route('/:pin_id')
  .get(getPin)
  .patch(patchPin)
  .delete(deletePin)
  .all(methodNotAllowed);

module.exports = pinsRouter;
