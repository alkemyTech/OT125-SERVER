const db = require('../models/index');

/**
 * fetchs all not deleted users
 * @returns
 */
module.exports.getAll = async (opts) => {
  try {
    opts.page = +opts.page <= 0 ? 1 : opts.page;
    const page = parseInt(opts.page, 10) || 1;
    const limit = parseInt(opts.limit, 10) || 10;
    const offset = (page - 1) * limit;

    let { count, rows } = await db.Comment.findAndCountAll({
      attributes: { include: ['body'] },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return [
      {
        comments: rows,
        metadata: {
          total: count,
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
