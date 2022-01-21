const { validationResult } = require('express-validator');
const asyncWrapper = require('../utils/asyncWrapper');
const userRepository = require('../repository/user');

/**
 * @route POST /users/register
 */
module.exports.register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = { ...req.body };

  const [user, err] = await userRepository.saveOne(body);
  if (err) {
    // @TODO: hanndle error
    return res.status(500).json({});
  }

  res.json(user);
});

/**
 * @route POST /users/login
 */
module.exports.login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const [user, err] = userRepository.getByEmail(email);
  if (err) {
    // @TODO: hanndle error
    return res.status(500).json({});
  }
  const validPass = await user.validatePassword(password);

  if (!validPass) return res.status(401).json({});

  // @TODO: add session/authorization code
  res.json(user);
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
