var express = require('express');
var router = express.Router();
const authRouter = require('./auth')

const userController = require('../controllers/user');

/* GET users listing. */
router.use('/auth', authRouter);

router.delete('/:id', userController.delete )

module.exports = router;