'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario1',
          lastName: 'Demo',
          email: 'test1@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario2',
          lastName: 'Demo',
          email: 'test2@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario3',
          lastName: 'Demo',
          email: 'test3@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario4',
          lastName: 'Demo',
          email: 'test4@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario5',
          lastName: 'Demo',
          email: 'test5@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario6',
          lastName: 'Demo',
          email: 'test6@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario7',
          lastName: 'Demo',
          email: 'test7@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario8',
          lastName: 'Demo',
          email: 'test8@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario9',
          lastName: 'Demo',
          email: 'test9@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario10',
          lastName: 'Demo',
          email: 'test10@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // ///////////
        {
          firstName: 'Usuario11',
          lastName: 'Demo',
          email: 'test11@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario12',
          lastName: 'Demo',
          email: 'test12@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario13',
          lastName: 'Demo',
          email: 'test13@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario14',
          lastName: 'Demo',
          email: 'test14@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario15',
          lastName: 'Demo',
          email: 'test15@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario16',
          lastName: 'Demo',
          email: 'test16@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario17',
          lastName: 'Demo',
          email: 'test17@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario18',
          lastName: 'Demo',
          email: 'test18@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario19',
          lastName: 'Demo',
          email: 'test19@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Usuario20',
          lastName: 'Demo',
          email: 'test20@test.com',
          // password: '1234'
          password:
            '$2a$10$F8Pw/Kjji4.QSbP/HN101.9N4SPy/xtr2CkQPbe7Jq1N90tBDAhd2',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      // {
      //   individualHooks: true,
      // }
    );
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, { truncate: true });
  },
};
