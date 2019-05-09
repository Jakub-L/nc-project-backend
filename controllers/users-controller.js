const {
  selectAllUsers,
  selectUser,
  addUser,
  modifyUser,
  removeUser,
<<<<<<< HEAD
  checkPassword,
} = require('../models/users-models');

function authenticateUser(req, res, next) {
  const { email, password } = req.body;
  checkPassword(email, password)
    .then(user => res.status(200).json({ user }))
    .catch(next({ status: 400 }));
}

function getAllUsers(req, res, next) {
  const acceptQueries = ['sort_by', 'order', 'name', 'email'];
  if (Object.keys(req.query).every(query => acceptQueries.includes(query))) {
    selectAllUsers(req.query).then((users) => {
=======
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
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
      res.status(200).json({ users });
    });
  } else {
    next({ status: 400 });
  }
}

function getUser(req, res, next) {
<<<<<<< HEAD
  selectUser(req.params).then((users) => {
=======
  selectUser(req.params).then(users => {
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
    if (users.length === 0) {
      next({ status: 404 });
    } else {
      const [user] = users;
      res.status(200).json({ user });
    }
  });
}

function postUser(req, res, next) {
<<<<<<< HEAD
  addUser(req.body).then((users) => {
=======
  addUser(req.body).then(users => {
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
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
<<<<<<< HEAD
    .then((users) => {
=======
    .then(users => {
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
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
<<<<<<< HEAD
  removeUser(req.params).then((users) => {
=======
  removeUser(req.params).then(users => {
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
    if (users.length === 0) {
      next({ status: 404 });
    } else {
      const [user] = users;
      res.status(204).json({});
    }
  });
}

module.exports = {
<<<<<<< HEAD
  authenticateUser,
=======
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
  getAllUsers,
  getUser,
  postUser,
  patchUser,
<<<<<<< HEAD
  deleteUser,
=======
  deleteUser
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
};
