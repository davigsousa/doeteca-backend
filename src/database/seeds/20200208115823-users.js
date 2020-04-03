'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      name: 'Gabriel',
      email: 'gabriel@email.com',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
    {
      name: 'Davi',
      email: 'davi@email.com',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
    {
      name: 'Robesvaldo',
      email: 'robesvaldo@email.com',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
