
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    ignoreTables: [], // empty all tables
  });
};