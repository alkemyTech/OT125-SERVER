'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class members extends Model {

    static associate(models) {
      // define association here
    }
  }
  members.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'members',
  });
  return members;
};