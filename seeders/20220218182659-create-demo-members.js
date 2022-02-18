'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Members',
      [
        {
          name: 'Member 1 ',
          facebookUrl: 'https://www.facebook.com/member',
          instagramUrl: 'https://www.instagram.com/member',
          linkedinUrl: 'https://www.linkedIn.com/member',
          image: 'https://i.imgur.com/example-member.jpg ',
          description: 'Sample description of member ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Member 2 ',
          facebookUrl: 'https://www.facebook.com/member',
          instagramUrl: 'https://www.instagram.com/member',
          linkedinUrl: 'https://www.linkedIn.com/member',
          image: 'https://i.imgur.com/example-member.jpg ',
          description: 'Sample description of member ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Member 3 ',
          facebookUrl: 'https://www.facebook.com/member',
          instagramUrl: 'https://www.instagram.com/member',
          linkedinUrl: 'https://www.linkedIn.com/member',
          image: 'https://i.imgur.com/example-member.jpg ',
          description: 'Sample description of member ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Member 4 ',
          facebookUrl: 'https://www.facebook.com/member',
          instagramUrl: 'https://www.instagram.com/member',
          linkedinUrl: 'https://www.linkedIn.com/member',
          image: 'https://i.imgur.com/example-member.jpg ',
          description: 'Sample description of member ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Member 5 ',
          facebookUrl: 'https://www.facebook.com/member',
          instagramUrl: 'https://www.instagram.com/member',
          linkedinUrl: 'https://www.linkedIn.com/member',
          image: 'https://i.imgur.com/example-member.jpg ',
          description: 'Sample description of member ',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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
        await sequelize.query('TRUNCATE TABLE Members', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

