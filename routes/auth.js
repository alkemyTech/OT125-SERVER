var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const userValidator = require('../middleware/userValidation');
const errorFilter = require('../middleware/errorFilter');

router.post(
  '/register',
  userValidator.register,
  errorFilter,
  userController.register
);
router.post('/login', userValidator.login, errorFilter, userController.login);

module.exports = router;
