'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'Debora',
      facebookUrl: 'https://www.facebook.com/debora',
      instagramUrl: 'https://www.instagram.com/debora',
      linkedinUrl:'https://www.linkedIn.com/debora',
      image:'',
      description:'Muy amable',
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
