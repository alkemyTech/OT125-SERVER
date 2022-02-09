'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations',[{
      name: 'Somos más',
      image:'img.png',
      address: 'Av. Velez Sarsfield 1234',
      phone: 1160112988,
      email: 'somosfundacionmas@gmail.com',
      welcomeText: 'Organization welcome text example',
      aboutUsText: 'Another text example',
      createdAt: new Date,
      updatedAt: new Date,
      url_facebook: 'https://www.facebook.com/Somos-M%C3%A1s-Fundaci%C3%B3n-104277135400243',
      url_linkedin: 'linkedin/ong.com',
      url_instagram: 'instagram/ong'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
        await sequelize.query('TRUNCATE TABLE Organizations', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
