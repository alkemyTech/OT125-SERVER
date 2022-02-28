'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Members',
      [
        {
          name: 'Debora',
          facebookUrl: 'https://www.facebook.com/debora',
          instagramUrl: 'https://www.instagram.com/debora',
          linkedinUrl: 'https://www.linkedIn.com/debora',
          image: '',
          description: 'Muy amable',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pedro',
          facebookUrl: 'https://www.facebook.com/Pedro',
          instagramUrl: 'https://www.instagram.com/Pedro',
          linkedinUrl: 'https://www.linkedIn.com/Pedro',
          image: '',
          description: 'Organizador de eventos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Marta',
          facebookUrl: 'https://www.facebook.com/Marta',
          instagramUrl: 'https://www.instagram.com/Marta',
          linkedinUrl: 'https://www.linkedIn.com/Marta',
          image: '',
          description: 'Profesional: desarrolladora, C#',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Juan',
          facebookUrl: 'https://www.facebook.com/Juan',
          instagramUrl: 'https://www.instagram.com/Juan',
          linkedinUrl: 'https://www.linkedIn.com/Juan',
          image: '',
          description: 'Me gustan los jueguitos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Miguel',
          facebookUrl: 'https://www.facebook.com/Miguel',
          instagramUrl: 'https://www.instagram.com/Miguel',
          linkedinUrl: 'https://www.linkedIn.com/Miguel',
          image: '',
          description: 'Tengo una pasión, es la de coleccionar cartas pokemon. Player profesional de cartas.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Julieta',
          facebookUrl: 'https://www.facebook.com/Julieta',
          instagramUrl: 'https://www.instagram.com/Julieta',
          linkedinUrl: 'https://www.linkedIn.com/Julieta',
          image: '',
          description: 'Tengo una descripcion muy buena',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Barbara',
          facebookUrl: 'https://www.facebook.com/Barbara',
          instagramUrl: 'https://www.instagram.com/Barbara',
          linkedinUrl: 'https://www.linkedIn.com/Barbara',
          image: '',
          description: 'RRHH, recruiter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tamara',
          facebookUrl: 'https://www.facebook.com/Tamara',
          instagramUrl: 'https://www.instagram.com/Tamara',
          linkedinUrl: 'https://www.linkedIn.com/Tamara',
          image: '',
          description: 'Creadora de contenido',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Debora',
          facebookUrl: 'https://www.facebook.com/Debora',
          instagramUrl: 'https://www.instagram.com/Debora',
          linkedinUrl: 'https://www.linkedIn.com/Debora',
          image: '',
          description: 'RRHH, administrativa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ciro',
          facebookUrl: 'https://www.facebook.com/Ciro',
          instagramUrl: 'https://www.instagram.com/Ciro',
          linkedinUrl: 'https://www.linkedIn.com/Ciro',
          image: '',
          description: 'Cantante',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tarja',
          facebookUrl: 'https://www.facebook.com/Tarja',
          instagramUrl: 'https://www.instagram.com/Tarja',
          linkedinUrl: 'https://www.linkedIn.com/Tarja',
          image: '',
          description: 'Cantante, compositora',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Duki',
          facebookUrl: 'https://www.facebook.com/Duki',
          instagramUrl: 'https://www.instagram.com/Duki',
          linkedinUrl: 'https://www.linkedIn.com/Duki',
          image: '',
          description: 'Cantante, super sayayin',
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
        await sequelize.query('TRUNCATE TABLE Members', options);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
