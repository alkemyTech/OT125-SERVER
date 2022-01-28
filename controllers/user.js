const { validationResult } = require('express-validator');
const userRepository = require('../repositories/user');
const asyncWrapper = require('../utils/asyncWrapper');
const { handleError } = require('../utils/errorHandler');
const JWT = require('../services/jwt');

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
    errJSON = handleError(err);
    return res
      .status(errJSON.statusCode)
      .json({ errors: [{ msg: errJSON.errMessage }] });
  }

  delete user.dataValues.password;
  delete user.dataValues.deletedAt;

  const token = JWT.sign(user.dataValues);

  res.json({ user, token });
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

  const [user, err] = await userRepository.getByEmail(email);
  if (err) {
    errJSON = handleError(err);
    return res
      .status(errJSON.statusCode)
      .json({ errors: [{ msg: errJSON.errMessage }] });
  }

  const validPass = await user.validatePassword(password);
  if (!validPass)
    return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });

  delete user.dataValues.password;
  delete user.dataValues.deletedAt;

  const token = JWT.sign(user.dataValues);

  res.json({ user, token });
});
