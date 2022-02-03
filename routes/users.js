var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.getAll);

router.delete('/:id', userController.delete);

module.exports = router;
