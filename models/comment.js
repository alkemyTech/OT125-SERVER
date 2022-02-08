'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.New, { as: 'news', foreignKey: 'postId' });
      Comment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    }
  }
  Comment.init(
    {
      userId: DataTypes.NUMBER,
      body: DataTypes.TEXT,
      postId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
