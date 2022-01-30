const JWT = require('../services/jwt');

/**
 * validates that request contains a valid jwt token on a Bearer Authorization header
 */
module.exports.authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.statusCode = 401;
    res.json({ errors: [{ msg: 'no authorization header provided' }] });
    return;
  }

  if (authHeader.split(' ')[0] !== 'Bearer') {
    res.statusCode = 401;
    res.json({
      errors: [
        {
          msg: 'authorization header should follow the pattern: Bearer {token}',
        },
      ],
    });
    return;
  }

  const payload = JWT.verify(authHeader.split(' ')[1]);
  if (!payload) {
    res.statusCode = 401;
    res.json({ errors: [{ msg: 'unauthorized' }] });
    return;
  }

  req.currentUser = payload;

  next();
};
