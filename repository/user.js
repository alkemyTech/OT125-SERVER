const db = require('../models/index');
const User = db['User'];

module.exports.saveOne = async (body) => {
  let user = User.build(body);

  try {
    await user.save();
    return [user, null];
  } catch (e) {
    return [null, e];
  }
};

module.exports.getByEmail = async (email) => {
  try {
    let user = await User.findOne({ where: { email } });
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
