const bcrypt = require('bcrypt');
const connection = require('../db/connection');

function selectAllUsers(queryObj) {
  const sortObj = { sort_by: 'name', order: 'asc' };
  const sortProps = ['sort_by', 'order'];
  sortProps.forEach((sortProp) => {
    if (queryObj.hasOwnProperty(sortProp)) {
      sortObj[sortProp] = queryObj[sortProp];
      delete queryObj[sortProp];
    }
  });
  let rawCondition = '1 = 1';
  if (queryObj.hasOwnProperty('email')) {
    const sanitizer = /(<|>|"|'|AND|OR|NOT)/i;
    if (!sanitizer.test(queryObj.email)) {
      rawCondition = `LOWER(email) = ${queryObj.email}`;
      delete queryObj.email;
    }
  }

  return connection
    .select(
      'users.user_id AS user_id',
      'users.name AS name',
      'users.email AS email',
      'users.user_photo AS user_photo',
    )
    .from('users')
    .where(queryObj)
    .whereRaw(rawCondition)
    .orderBy(sortObj.sort_by, sortObj.order);
}

function selectUser(paramObj) {
  Object.keys(paramObj).forEach((prop) => {
    paramObj[`users.${prop}`] = paramObj[prop];
    delete paramObj[prop];
  });
  return connection
    .select(
      'users.user_id AS user_id',
      'users.name AS name',
      'users.email AS email',
      'users.user_photo AS user_photo',
    )
    .from('users')
    .where(paramObj);
}

function addUser(userReqBody) {
  const user = {
    name: userReqBody.name,
    password_hash: bcrypt.hashSync(userReqBody.password, 10),
    email: userReqBody.email,
    user_photo:
      userReqBody.user_photo
      || 'https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-512.png',
  };
  return connection
    .insert(user)
    .into('users')
    .returning(['name', 'email', 'user_photo', 'user_id']);
}

function modifyUser(paramObj, updateObj) {
  return connection('users')
    .where(paramObj)
    .update(updateObj)
    .returning('name', 'email', 'user_photo', 'user_id');
}

function removeUser(paramObj) {
  return connection('users')
    .where(paramObj)
    .del();
}

module.exports = {
  selectAllUsers,
  selectUser,
  addUser,
  modifyUser,
  removeUser,
};
