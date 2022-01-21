var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const userValidator = require('../middleware/userValidation');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userValidator.register, userController.register);
router.post('/login', userValidator.login, userController.login);

module.exports = router;
