const { users, sites, pins } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('users')
        .insert(users)
        .returning('*');
    })
    .then(() => {
      return knex('sites')
        .insert(sites)
        .returning('*');
    })
    .then(() => {
      return knex('pins')
        .insert(pins)
        .returning('*');
    });
};
