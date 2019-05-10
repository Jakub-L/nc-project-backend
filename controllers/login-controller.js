const { checkPassword } = require('../models/login-models');

function authenticateUser(req, res) {
  const { email, password } = req.body;
  checkPassword(email, password)
    .then(user => res.status(200).json({ user }))
    .catch(() => res.status(400).json({ msg: 'Bad request' }));
}

module.exports = { authenticateUser };
