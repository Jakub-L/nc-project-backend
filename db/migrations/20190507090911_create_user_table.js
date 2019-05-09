<<<<<<< HEAD
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (userTable) => {
    userTable.increments('user_id').primary();
    userTable.string('name');
    userTable.string('password_hash');
    userTable.string('email').unique();
=======
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', userTable => {
    userTable.increments('user_id').primary();
    userTable.string('username').unique();
    userTable.string('name');
    userTable.string('email');
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
    userTable.string('user_photo', 1000);
  });
};

<<<<<<< HEAD
exports.down = function (knex, Promise) {
=======
exports.down = function(knex, Promise) {
>>>>>>> c6145ea34085357e37cceb3e95db523e8733400d
  return knex.schema.dropTable('users');
};
