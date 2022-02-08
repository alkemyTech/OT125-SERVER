'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', [{
      name: 'Ruth',
      image: '',
      content: 'without comment',
      //createdAt: new Date,
     // updatedAt: new Date,
     //deteletAt:
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
