'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Slides', 
      [
        {
          imageUrl: 'image-url-1',
          text: 'descriptionSlide1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: 'image-url-2',
          text: 'descriptionSlide2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: 'image-url-3',
          text: 'descriptionSlide3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
        await sequelize.query('TRUNCATE TABLE Slides', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  }
};
