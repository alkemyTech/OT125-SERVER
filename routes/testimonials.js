var express = require('express');
var router = express.Router();

const testimonialsControllers= require('../controllers/testimonials')


router.get('/', testimonialsControllers.create);

module.exports = router;