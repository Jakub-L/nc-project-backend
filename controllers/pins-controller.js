const {
  selectAllPins, selectPin, addPin, modifyPin, removePin,
} = require('../models/pins-models');

function getAllPins(req, res, next) {
  const acceptQueries = [
    'sort_by',
    'order',
<<<<<<< HEAD
=======
    'username', // users.username
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
    'email', // users.email
    'site_name', // sites.site_name
    'min_date',
    'max_date',
    'min_latitude',
    'max_latitude',
    'min_longitude',
    'max_longitude',
    'min_altitude',
    'max_altitude',
  ];
  if (Object.keys(req.query).every(query => acceptQueries.includes(query))) {
    selectAllPins(req.query).then((pins) => {
      res.status(200).json({ pins });
    });
  } else {
    next({ status: 400 });
  }
}

function getPin(req, res, next) {
  selectPin(req.params).then((pins) => {
    if (pins.length === 0) {
      next({ status: 404 });
    } else {
      const [pin] = pins;
      res.status(200).json({ pin });
    }
  });
}

function postPin(req, res, next) {
  addPin(req.body).then((pins) => {
    if (pins.length === 0) {
      next({ status: 404 });
    } else {
      const [pin] = pins;
      res.status(201).json({ pin });
    }
  });
}

function patchPin(req, res, next) {
  modifyPin(req.params, req.body)
    .then((pins) => {
      if (pins.length === 0) {
        next({ code: 404 });
      } else {
        const [pin] = pins;
        res.status(202).json({ pin });
      }
    })
    .catch(next);
}

function deletePin(req, res, next) {
  removePin(req.params).then((pins) => {
    if (pins.length === 0) {
      next({ status: 404 });
    } else {
      const [pin] = pins;
      res.status(204).json({});
    }
  });
}

module.exports = {
  getAllPins,
  getPin,
  postPin,
  patchPin,
  deletePin,
};
