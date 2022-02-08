var express = require('express');
var router = express.Router();

const testimonialsControllers= require('../controllers/testimonials');
const isAdminMIddleware=require('../Middleware/isAdmin');

router.get('/create',testimonialsControllers.create);

router.post('/create',isAdminMIddleware,testimonialsControllers.store);

router.get('/edit/:id',isAdminMIddleware,testimonialsControllers.edit);

router.put('/edit/:id', isAdminMIddleware,testimonialsControllers.update);

router.delete('/destroy/:id' , testimonialsControllers.destroy);





module.exports = router;