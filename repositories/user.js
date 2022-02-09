const db = require('../models/index');

/**
 * saves to db instance of db.User
 * @param {Object} body
 * @returns {Promise.<[Object|null,Error|null]>} instance of db.User or Error
 */
module.exports.saveOne = async (body) => {
  let user = db.User.build(body);

  try {
    await user.save();
    return [user, null];
  } catch (e) {
    return [null, e];
  }
};

/**
 * fetchs to db a user by its email
 * @param {string} email
 * @returns {Promise.<[Object|null,Error|null]>} instance of db.User or Error
 */
module.exports.getByEmail = async (email) => {
  try {
    let user = await db.User.findOne({ where: { email } });
    if (!user) {
      let err = new Error();
      err.name = 'not_found';
      err.entity = { name: 'User', key: 'email', keyValue: email };
      return [null, err];
    }
    return [user, null];
  } catch (e) {
    return [null, e];
  }
};

/**
 * fetchs all users
 * @param {object} opts pagination options
 * @returns {Promise.<[Object|null,Error|null]>} object {users,metadata} or Error
 */
module.exports.getAll = async (opts) => {
  try {
    opts.page = +opts.page <= 0 ? 1 : opts.page;
    const page = parseInt(opts.page, 10) || 1;
    const limit = parseInt(opts.limit, 10) || 10;
    const offset = (page - 1) * limit;

    let { count, rows } = await db.User.findAndCountAll({
      attributes: { exclude: ['password', 'deletedAt'] },
      limit,
      offset,
    });

    return [
      {
        users: rows,
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

module.exports.deleteUser = async (ID) => {
  try {
    let deleted = await db.User.destroy({
      where: {
        id: ID,
      },
    });
    return [deleted, null];
  } catch (e) {
    return [null, e];
  }
};
