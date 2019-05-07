exports.up = function(knex, Promise) {
  return knex.schema.createTable('pins', pinTable => {
    pinTable.increments('pin_id').primary();
    pinTable
      .integer('user_id')
      .references('users.user_id')
      .onDelete('CASCADE');
    pinTable
      .integer('site_id')
      .references('sites.site_id')
      .onDelete('CASCADE');
    pinTable.timestamp('timestamp').defaultTo(knex.fn.now());
    pinTable.float('latitude', null);
    pinTable.float('longitude', null);
    pinTable.float('altitude', null);
    pinTable.string('photo_url', 1000);
    pinTable.text('note');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins');
};
