var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const { isAdmin } = require('../middleware/isAdmin');
const { authenticate } = require('../middleware/authenticate');

/* GET users listing. */
router.get('/', authenticate, isAdmin, userController.getAll);

router.delete('/:id', userController.delete);

module.exports = router;
