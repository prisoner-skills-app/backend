const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('centers').insert([
    {
      id: 1, 
      email: 'admin@azkaban.com', 
      password: bcrypt.hashSync('password', 12), 
      name: 'Azkaban',
      wardenName: 'Eldritch Dementor',
      phone: '555-555-5555',
      city: 'San Francisco',
      state: 'CA',
      profileComplete: true,
  }
  ]);
};
