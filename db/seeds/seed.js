const { users, sites, pins } = require('../data');

exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex('users')
    .insert(users)
    .returning('*'))
  .then(() => knex('sites')
    .insert(sites)
    .returning('*'))
  .then(() => knex('pins')
    .insert(pins)
    .returning('*'))
  });
