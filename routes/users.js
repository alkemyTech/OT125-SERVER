var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.delete('/:id', userController.delete )

module.exports = router;