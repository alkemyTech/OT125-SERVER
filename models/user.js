'use strict';
const { Model } = require('sequelize');
const Password = require('../services/passwords');
const welcomeEmail = require('../services/email')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { as: 'role' });
    }

    async validatePassword(password) {
      return await Password.compare(password, this.password);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'User',
      hooks: {
        beforeCreate: async function (user) {
          user.password = await Password.toHash(user.password);
        },
        afterCreate: async function( user){
          await welcomeEmail.welcomeEmail(user)
        }
      },
    }
  );
  return User;
};
