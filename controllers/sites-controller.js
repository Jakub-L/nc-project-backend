const {
  selectAllSites,
  selectSite,
  addSite,
  modifySite,
  removeSite
} = require('../models/sites-models');

function getAllSites(req, res, next) {
  const acceptQueries = [
    'sort_by',
    'order',
    'site_id',
    'name',
    'min_latitude',
    'max_latitude',
    'min_longitude',
    'max_longitude',
    'min_altitude',
    'max_altitude'
  ];
  if (Object.keys(req.query).every(query => acceptQueries.includes(query))) {
    selectAllSites(req.query).then(sites => {
      res.status(200).json({ sites });
    });
  } else {
    next({ status: 400 });
  }
}

function getSite(req, res, next) {
  selectSite(req.params).then(sites => {
    if (sites.length === 0) {
      next({ status: 404 });
    } else {
      const [site] = sites;
      res.status(200).json({ site });
    }
  });
}

function postSite(req, res, next) {
  addSite(req.params, req.body).then(sites => {
    if (sites.length === 0) {
      next({ status: 404 });
    } else {
      const [site] = sites;
      res.status(201).json({ site });
    }
  });
}

function patchSite(req, res, next) {
  modifySite(req.params, req.body)
    .then(sites => {
      if (sites.length === 0) {
        next({ code: 404 });
      } else {
        const [site] = sites;
        res.status(202).json({ site });
      }
    })
    .catch(next);
}

function deleteSite(req, res, next) {
  removeSite(req.params).then(sites => {
    if (sites.length === 0) {
      next({ status: 404 });
    } else {
      const [site] = sites;
      res.status(204).json({});
    }
  });
}

module.exports = {
  getAllSites,
  getSite,
  postSite,
  patchSite,
  deleteSite
};
