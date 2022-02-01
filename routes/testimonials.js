var express = require('express');
var router = express.Router();

const testimonialsControllers= require('../controllers/testimonials')


router.get('/create',testimonialsControllers.create);

router.post('/create',testimonialsControllers.store);

router.get('/edit/:id', testimonialsControllers.edit);

router.put('/edit/:id', testimonialsControllers.update);

router.delete('/destroy/:id', testimonialsControllers.destroy);





module.exports = router;