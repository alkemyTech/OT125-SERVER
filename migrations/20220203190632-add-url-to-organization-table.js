'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'url_facebook', { type: Sequelize.STRING }),
      await queryInterface.addColumn('Organizations', 'url_linkedin', { type: Sequelize.STRING }),
      await queryInterface.addColumn('Organizations', 'url_instagram', { type: Sequelize.STRING })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'url_facebook'),
      await queryInterface.removeColumn('Organizations', 'url_linkedin'),
      await queryInterface.removeColumn('Organizations', 'url_instagram')
  }
};
