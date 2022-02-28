const e = require('express');
const db = require('../models/index');

/**
 * fetchs all comments
 * @param {object} opts pagination options
 * @returns {Promise.<[Object|null,Error|null]>} object {comments,metadata} or Error
 */
module.exports.getAll = async (opts) => {
  try {
    opts.page = +opts.page <= 0 ? 1 : opts.page;
    const page = parseInt(opts.page, 10) || 1;
    const limit = parseInt(opts.limit, 10) || 10;
    const offset = (page - 1) * limit;

    let { count, rows } = await db.Comment.findAndCountAll({
      attributes: { exclude: ['postId', 'userId'] },
      order: [['createdAt', 'DESC']],
      include: [
        { association: 'news', attributes: ['id', 'name'] },
        { association: 'user', attributes: ['id', 'firstName', 'image'] },
      ],

      limit,
      offset,
    });

    return {
      comments: rows,
      metadata: {
        lastPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: count / limit > page ? page + 1 : null,
      },
    };
  } catch (e) {
    throw e;
  }
};

/**
 * saves a comment into db
 */
module.exports.create = async (commentInf) => {
  try {
    return (comment = await db.Comment.create(commentInf));
  } catch (e) {
    throw e;
  }
};

module.exports.getOne = async (id) => {
  try {
    const comment = await db.Comment.findByPk(id);
    if (!comment) throw (new Error('comment not found').name = 'not_found');
    return comment;
  } catch (e) {
    throw e;
  }
};

module.exports.update = async (commentInf, id) => {
  try {
    let values = {};
    values['body'] = commentInf['body'];

    const comment = await this.getOne(id);
    console.log(comment);
    return await comment.update(values);
  } catch (e) {
    throw e;
  }
};

module.exports.delete = async (id) => {
  try {
    const comment = await this.getOne(id);
    await comment.destroy();
  } catch (e) {
    throw e;
  }
};
