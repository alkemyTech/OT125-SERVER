'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Organization Test',
          image: 'img.png',
          address: 'test av 1234',
          phone: 33445566,
          email: 'organization@test.com',
          welcomeText: 'Organization welcome text example',
          aboutUsText: 'Another text example',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
        await sequelize.query('TRUNCATE TABLE Organizations', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
