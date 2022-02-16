const userRepository = require('../repositories/user');
const roleRepository = require('../repositories/role');
const asyncWrapper = require('../utils/asyncWrapper');
const { handleError } = require('../utils/errorHandler');
const JWT = require('../services/jwt');

/**
 * @route POST /auth/register
 */
module.exports.register = asyncWrapper(async (req, res, next) => {
  const body = { ...req.body };

  /*  //If roles are standarized, then it should be possible to assing a roleId without having to query the DB
      not a good practice// 
  body.roleId = 2
  */

  const [role, errRole] = await roleRepository.getRoles('Standard');
  if (!role || errRole) {
    res.status(500).json({
      errors: [{ msg: `Role corresponding to Standard user doesn't exist` }],
    });
    return;
  }
  body.roleId = role.id;

  user = await userRepository.saveOne(body);

  delete user.dataValues.password;
  delete user.dataValues.deletedAt;

  const token = JWT.sign(user.dataValues);

  res.status(201).json({ user, token });
});

/**
 * @route POST /auth/login
 */
module.exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userRepository.getByEmail(email);

  const validPass = await user.validatePassword(password);
  if (!validPass)
    return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });

  delete user.dataValues.password;
  delete user.dataValues.deletedAt;

  const token = JWT.sign(user.dataValues);

  res.json({ user, token });
});

/**
 * @route GET /users
 */
module.exports.getAll = asyncWrapper(async (req, res, next) => {
  const result = await userRepository.getAll(req.query);
  res.json(result);
});

/**
 * @route DELETE /users/:id
 */
module.exports.delete = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const [user, err] = userRepository.deleteUser(id);
  if (err) {
    errJSON = handleError(err);
    return res
      .status(errJSON.statusCode)
      .json({ errors: [{ msg: errJSON.message }] });
  }
  console.log(user);
  return res.status(200).json({ data: user });
});


module.exports.getLoginData = asyncWrapper(async(req,res,next)=>{
delete req.currentUser.iat;
delete req.currentUser.exp;
return res.status(200).json({loginData:req.currentUser})
})