exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', userTable => {
    userTable.increments('user_id').primary();
    userTable.string('username').unique();
    userTable.string('name');
    userTable.string('email');
    userTable.string('user_photo', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
