exports.up = function (knex, Promise) {
  return knex.schema.createTable('sites', siteTable => {
    siteTable.increments('site_id').primary();
    siteTable.string('name');
    siteTable.decimal('latitude_min', null);
    siteTable.decimal('longitude_min', null);
    siteTable.decimal('altitude_min', null);
    siteTable.decimal('latitude_max', null);
    siteTable.decimal('longitude_max', null);
    siteTable.decimal('altitude_max', null);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('sites');
};
