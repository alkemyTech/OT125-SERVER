'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
 
    static associate(models) {
      // define association here
    }
  }
  Contacts.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Contacts',
  });
  return Contacts;
};