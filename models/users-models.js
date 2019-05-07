const connection = require('../db/connection');

function selectAllUsers(queryObj) {
  const sortObj = { sort_by: 'name', order: 'asc' };
  const sortProps = ['sort_by', 'order'];
  sortProps.forEach(sortProp => {
    if (queryObj.hasOwnProperty(sortProp)) {
      sortObj[sortProp] = queryObj[sortProp];
      delete queryObj[sortProp];
    }
  });

  return connection
    .select('users.name AS name', 'users.email AS contact')
    .from('users')
    .where(queryObj)
    .orderBy(sortObj.sort_by, sortObj.order);
}

function selectUser(paramObj) {
  for (let prop in paramObj) {
    paramObj[`users.${prop}`] = paramObj[prop];
    delete paramObj[prop];
  }
  return connection
    .select('users.name AS name', 'users.email AS contact')
    .from('users')
    .where(paramObj);
}

function addUser(params, userReqBody) {
  const user = {
    username: userReqBody.username,
    name: userReqBody.name,
    email: userReqBody.email
  };
  return connection
    .insert(user)
    .into('users')
    .returning('*');
}

function modifyUser(paramObj, updateObj) {
  return connection('users')
    .where(paramObj)
    .update(updateObj)
    .returning('*');
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
  removeUser
};
