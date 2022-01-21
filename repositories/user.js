const db = require('../models/index');

module.exports.saveOne = async (body) => {
  let user = db.User.build(body);

  try {
    await user.save();
    return [user, null];
  } catch (e) {
    return [null, e];
  }
};

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
