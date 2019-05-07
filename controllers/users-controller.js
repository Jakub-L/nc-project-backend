const {
  selectAllUsers,
  selectUser,
  addUser,
  modifyUser,
  removeUser,
} = require('../models/users-models');

function getAllUsers(req, res, next) {
  const acceptQueries = [
    'sort_by',
    'order',
    'username',
    'name',
    'email',
  ];
  if (Object.keys(req.query).every(query => acceptQueries.includes(query))) {
    selectAllUsers(req.query).then(users => {
      res.status(200).json({ users });
    });
  } else {
    next({ status: 400 });
  }
}

function getUser(req, res, next) {
  selectUser(req.params).then(users => {
    if (users.length === 0) {
      next({ status: 404 });
    } else {
      const [user] = users;
      res.status(200).json({ user });
    }
  });
}

function postUser(req, res, next) {
  addUser(req.params, req.body).then(users => {
    if (users.length === 0) {
      next({ status: 404 });
    } else {
      const [user] = users;
      res.status(201).json({ user });
    }
  });
}

function patchUser(req, res, next) {
  modifyUser(req.params, req.body)
    .then(users => {
      if (users.length === 0) {
        next({ code: 404 });
      } else {
        const [user] = users;
        res.status(202).json({ user });
      }
    })
    .catch(next);
}

function deleteUser(req, res, next) {
  removeUser(req.params).then(users => {
    if (users.length === 0) {
      next({ status: 404 });
    } else {
      const [user] = users;
      res.status(204).json({});
    }
  });
}

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser
};
