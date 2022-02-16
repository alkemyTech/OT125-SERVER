var express = require('express');
const slidesController = require('../controllers/slidesController');
var router = express.Router();
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

router.get('/',slidesController.findAll);

router.get('/:id',slidesController.findId);

router.use(auth, isAdmin);

router.post('/', slidesController.create);

router.put('/:id',slidesController.update);

router.delete('/:id', slidesController.destroy);

module.exports = router;
