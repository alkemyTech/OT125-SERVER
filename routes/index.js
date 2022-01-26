var express = require('express');
var router = express.Router();
/* GET home page. */

const roleRouter = require('./role')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/role', roleRouter )

module.exports = router;
