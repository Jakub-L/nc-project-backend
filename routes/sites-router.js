const sitesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
  getAllSites,
  getSite,
  postSite,
  patchSite,
  deleteSite,
} = require('../controllers/sites-controller');

sitesRouter
  .route('/')
  .get(getAllSites)
  .all(methodNotAllowed);

sitesRouter
  .route('/:site_id')
  .get(getSite)
  .post(postSite)
  .patch(patchSite)
  .delete(deleteSite)
  .all(methodNotAllowed);

module.exports = sitesRouter;
