'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      // {
      //   individualHooks: true,
      // }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
