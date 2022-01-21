const db = require('../models/index');

/**
 * saves to db instance of db.User
 * @param {Object} body
 * @returns {[Object|null,Error|null]} instance of db.User or Error
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
 * @returns {[Object|null,Error|null]} instance of db.User or Error
 */
module.exports.getByEmail = async (email) => {
  try {
    let user = await db.User.findOne({ where: { email } });
    if (!user) {
      let err = new Error(`no user found with email ${email}`);
      err.name = 'not_found';
      return [null, err];
    }
    return [user, null];
  } catch (e) {
    return [null, e];
  }
};
