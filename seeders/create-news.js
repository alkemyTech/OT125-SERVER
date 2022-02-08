'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('news',[{
            name: 'News Test',
            content: 'Content demo',
            image:'img.png',
            categoryId: 1,
            deletedAt: new Date,
            createdAt: new Date,
            updatedAt: new Date
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('news', null, {});
    }
};