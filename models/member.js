'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
   
    
  };
  Member.init({
    name: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
    
   
  }, {
    sequelize,
    modelName: 'Member',
    paranoid: true
  });
  return Member;
};