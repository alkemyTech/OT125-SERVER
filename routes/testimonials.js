var express = require('express');
var router = express.Router();
const validation = require('../middleware/testimonialValidation');
const testimonialsControllers= require('../controllers/testimonials')

router.post('/',validation.createValidation, testimonialsControllers.create);

const testimonialsControllers= require('../controllers/testimonials');
const isAdminMIddleware=require('../Middleware/isAdmin');

router.get('/create',testimonialsControllers.create);

router.post('/create',isAdminMIddleware,testimonialsControllers.store);

router.put('/edit/:id', isAdminMIddleware,testimonialsControllers.update);

router.delete('/destroy/:id',isAdminMIddleware , testimonialsControllers.destroy);


module.exports = router;