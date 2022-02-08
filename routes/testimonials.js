const express = require('express');
const router = express.Router();

const testimonialsControllers = require('../controllers/testimonials');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

router.get('/create', testimonialsControllers.create);

router.use(auth, isAdmin);

router.post('/create', testimonialsControllers.store);

router.get('/edit/:id', testimonialsControllers.edit);

router.put('/edit/:id', testimonialsControllers.update);

router.delete('/destroy/:id', testimonialsControllers.destroy);

module.exports = router;
