'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Slides', 
      [
        {
          imageUrl: '"https://cohorte-enero-835eb560.s3.amazonaws.com/LOGO-SOMOS-MAS1.png"',
          text: 'descriptionSlide 1',
          order: '1',
          organizationId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: '"https://cohorte-enero-835eb560.s3.amazonaws.com/LOGO-SOMOS-MAS2.png"',
          text: '2',
          order: '2',
          organizationId: 'organizationId 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: '"https://cohorte-enero-835eb560.s3.amazonaws.com/LOGO-SOMOS-MAS3.png"',
          text: 'descriptionSlide 3',
          order: '3',
          organizationId: '3',
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
