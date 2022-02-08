var express = require('express');
const slidesController= require('../controllers/slidesController')
var router = express.Router();


router.get('/', slidesController.create);


module.exports = router;