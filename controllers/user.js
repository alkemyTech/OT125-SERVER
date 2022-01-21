const asyncWrapper = require('../utils/asyncWrapper');
const db = require('../models/index');
const User = db['User'];

/**
 * @route POST /users/register
 */
module.exports.register = asyncWrapper(async (req, res, next) => {
  // TDOD: add validations and sanitazion
  const { firstName, lastName, email, image, password, roleId } = req.body;

  let user = User.build({
    firstName,
    lastName,
    email,
    image,
    password,
    roleId,
  });

  try {
    await user.save();
  } catch (e) {
    // TODO: error handling
    next(e);
    return;
  }

  // TODO: add session/authorization code

  res.json(user);
});

/**
 * @route POST /users/login
 */
module.exports.login = asyncWrapper(async (req, res, next) => {
  // TDOD: add validations and sanitazion
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ err: 'not registered' });
  console.log(user);
  const validPass = await user.validatePassword(password);

  if (!validPass) return res.status(401).json({});
  res.json(user);
  // TODO: add session/authorization code
});

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
 * makes sense? how should be implemented
 * scopes on authorization
 * if necessary, how queries should be done
 * @route GET /users
 * @TODO
 */
module.exports.getUsers = asyncWrapper(async (req, res, next) => {});

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
});

/**
 * makes sense? how should be implemented
 * scopes on authorization
 * @route GET /users/:id
 */
module.exports.getUser = asyncWrapper(async (req, res, next) => {
  res.status(200).json(req.user);
});

/**
 * scope limited to owner (and admin)(?
 * what information can be updated?
 * @route PUT /users/:id
 */
module.exports.update = asyncWrapper(async (req, res, next) => {
  // TODO: validation an sanitation -include password confirmation evaluation-
  const { firstName, lastName, image, password } = req.body;
  const user = req.user;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (image) user.image = image;
  if (password) user.password = password;

  await user.save();
  // TODO: error handling

  res.status(200).json(user);
});

/**
 * doesn't removes the user from the db, simply puts an state (delete date)
 * to point out that is no longer active
 * @route DELETE /users/:id
 */
module.exports.delete = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  await user.destroy();
  json.response(200).json({});
});
