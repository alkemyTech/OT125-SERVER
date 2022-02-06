'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'activities',
      [
        {
          name: 'Actividad Test',
          content: 'Demo',
          image:
            'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Actividad Test2',
          content: 'Demo2',
          image:
            'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Actividad Test3',
          content: 'Demo3',
          image:
            'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Actividad Test4',
          content: 'Demo3',
          image:
            'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Actividad Test5',
          content: 'Demo3',
          image:
            'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activities', null, {});
  },
};
