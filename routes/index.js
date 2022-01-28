var express = require('express');
var router = express.Router();
/* GET home page. */

const roleRouter = require('./role')
const userRouter = require('./users')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter )
router.use('/role', roleRouter )

module.exports = router;
