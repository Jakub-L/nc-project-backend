exports.up = function(knex, Promise) {
  return knex.schema.createTable('sites', siteTable => {
    siteTable.increments('site_id').primary();
    siteTable.string('name');
    siteTable.float('latitude_min', null);
    siteTable.float('longitude_min', null);
    siteTable.float('altitude_min', null);
    siteTable.float('latitude_max', null);
    siteTable.float('longitude_max', null);
    siteTable.float('altitude_max', null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sites');
};
