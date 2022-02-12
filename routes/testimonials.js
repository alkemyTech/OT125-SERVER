const express = require('express');
const router = express.Router();
const testimonialsControllers = require('../controllers/testimonials');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const {createValidation,updateValidation} = require('../Middleware/testimonialValidation');


router.get('/',testimonialsControllers.findAll);

//router.use(auth, isAdmin);

router.post('/',testimonialsControllers.create);

router.put('/:id',updateValidation,testimonialsControllers.update);

router.delete('/:id', testimonialsControllers.destroy);



module.exports = router;
