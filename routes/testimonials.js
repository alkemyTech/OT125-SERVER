var express = require('express');
var router = express.Router();
const validation = require('../middleware/testimonialValidation');
const testimonialsControllers= require('../controllers/testimonials')


router.post('/',validation.createValidation, testimonialsControllers.create);

module.exports = router;