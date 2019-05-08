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
  .then(() => {
    ['user', 'site', 'pin'].forEach((item) => {
      knex.raw(`SELECT SETVAL('${item}s_${item}_id_seq', MAX(${item}_id) FROM ${item}s)`);
    });
  });
