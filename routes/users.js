var express = require('express');
var router = express.Router();
const authRouter = require('./auth')

/* GET users listing. */
router.use('/auth', authRouter);

module.exports = router;
