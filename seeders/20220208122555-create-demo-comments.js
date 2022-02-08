'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,
          body: 'zzzzzzzzzzzzzz',
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          body: 'zzzzzdasdaaaaaaaaaaaaaaaaaaaaaaaaaaazzzzzzzzz',
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          body: 'zzasdasfazxczzzzzzzzz',
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          body: 'zzzasdazzzzzzz',
          postId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          body: 'zzzczbzzzz',
          postId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
        await sequelize.query('TRUNCATE TABLE Comments', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
