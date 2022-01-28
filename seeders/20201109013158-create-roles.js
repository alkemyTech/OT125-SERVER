'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        description: 'Usuario administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 1
      },
      {
        name: 'Standard',
        description: 'Usuario regular',
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 2

      }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Roles', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
