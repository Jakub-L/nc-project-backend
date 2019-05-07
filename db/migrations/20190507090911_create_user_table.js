exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', userTable => {
    userTable.increments('user_id').primary();
    userTable.string('username');
    userTable.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
