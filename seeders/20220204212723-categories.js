'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'Category 1',
        description: "Common news",
        image:"https://i.imgur.com/cat1.jpg"
        },
        {
          name: 'Category 2',
          description: "ONG News",
          image:"https://i.imgur.com/cat1.jpg"
        },
        {
          name: 'Category 3',
          description: "Kids news",
          image:"https://i.imgur.com/cat1.jpg"
        },
        {
          name: 'Category 4',
          description: "Activities News",
          image:"https://i.imgur.com/cat1.jpg"
        },
        {
          name: 'Category 5',
          description: "Other News",
          image:"https://i.imgur.com/cat1.jpg"
        },
    
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
