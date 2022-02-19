'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Testimonials',
      [
        {
          name: 'Testimonial 1',
          image: 'https://i.imgur.com/example-testimonial.jpg ',
          content: 'Sample content of testimonial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Testimonial 2',
          image: 'https://i.imgur.com/example-testimonial.jpg ',
          content: 'Sample content of testimonial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Testimonial 3',
          image: 'https://i.imgur.com/example-testimonial.jpg ',
          content: 'Sample content of testimonial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Testimonial 4',
          image: 'https://i.imgur.com/example-testimonial.jpg ',
          content: 'Sample content of testimonial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Testimonial 5',
          image: 'https://i.imgur.com/example-testimonial.jpg ',
          content: 'Sample content of testimonial',
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
        await sequelize.query('TRUNCATE TABLE Testimonials', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
