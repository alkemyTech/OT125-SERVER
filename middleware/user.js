const db = require('../models/index');
const User = db['User'];

/**
 * validates request and loads payload con request
 * to move to /middlewares
 */
module.exports.authenticate = asyncWrapper(async (req, res, next) => {
  // TODO: authentication and extraction of payload
  let payload;
  req.userPayload = payload;
});

/**
 * middleware that fetchs user given id and loads it in the req obj
 * intended to be used for endpoints
 * @route ALL /users/:id
 */
module.exports.fetchUser = asyncWrapper(async (req, res, next) => {
  let user;
  switch (req.method) {
    case 'THISCOULDBE "GET"':
      // makes sense eagerly load role of user?
      break;
    default:
      user = await User.findByPk(req.params.id);
      break;
  }

  if (!user)
    return res
      .status(404)
      .json({ error: `user with id ${req.params.id} not found ` });

  req.user = user;

  next();
});
