const express = require('express');
const router = express.Router();
const controller = require('../controllers/activitiesController');
const validator = require('../middleware/activitiesValidator')

const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');

router.use(auth);

//GET
router.get('/', controller.findAll)
router.get('/:id',validator.validateId,controller.findOne);
//POST
router.post('/', isAdmin,validator.create,controller.create);
//PATCH
router.put('/:id',isAdmin,validator.validateId,controller.update);
//DELETE
router.delete('/');


module.exports = router;