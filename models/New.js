'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    static associate(models) {
      New.belongsTo(models.Categories, { as: 'category' });
      New.hasMany(models.Comment, { foreignKey: 'postId' });
    }
  }
  New.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'New',
      paranoid: true,
    }
  );
  return New;
};
