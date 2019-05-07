exports.up = function (knex, Promise) {
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
    pinTable.decimal('latitude', null);
    pinTable.decimal('longitude', null);
    pinTable.decimal('altitude', null);
    pinTable.string('photo_url', 1000).defaultTo('https://cdn0.iconfinder.com/data/icons/elasto-online-store/26/00-ELASTOFONT-STORE-READY_user-circle-512.png');
    pinTable.text('note');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pins');
};
