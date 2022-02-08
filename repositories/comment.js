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

    return [
      {
        comments: rows,
        metadata: {
          lastPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: count / limit > page ? page + 1 : null,
        },
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
};
