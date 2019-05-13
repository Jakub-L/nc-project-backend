const bcrypt = require('bcrypt');
const connection = require('../db/connection');

function checkPassword(email, password) {
  if (/[<>\s]/.test(email)) return Promise.reject();
  return (
    connection('users')
      // .where({ email })
      .whereRaw('LOWER(email) = ?', email.toLowerCase())
      .then(([user]) => {
        if (!user) return Promise.reject();
        const { password_hash, ...returnUser } = user;
        if (!bcrypt.compareSync(password, password_hash)) return Promise.reject();
        return returnUser;
      })
  );
}

module.exports = { checkPassword };
