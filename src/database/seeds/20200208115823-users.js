'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      name: 'Gabriel',
      email: 'gabriel@email.com',
      twitter_username: 'exemplo',
      password_hash: '$2a$08$jHiONlWIx.lQFIOUFna4A.FcBESDS8mvE7pKoyzkER0dvnLUucDkC',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
    {
      name: 'Davi',
      email: 'davi@email.com',
      twitter_username: 'davig_sousa',
      password_hash: '$2a$08$.S0cA9c3Kw6/vDWoyh8hjOEthmpd10jmfHXCTqySdY.VM9iST.Z4m',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
    {
      name: 'Robesvaldo',
      email: 'robesvaldo@email.com',
      twitter_username: 'exemplorobes',
      password_hash: '$2a$08$bhe6DYf526pFtyzJCOcAGuN1/ToyPGtfSFLnE9lfnZXaPIxj3wbOC',
      created_at: '2020-02-10 17:05:34.401+00',
      updated_at: '2020-02-10 17:05:34.401+00',
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
