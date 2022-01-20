'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations',[{
      name: 'Organization Test',
      image:'img.png',
      address: 'test av 1234',
      phone: 33445566,
      welcomeText: 'Organization welcome text example',
      aboutUsText: 'Another text example',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
