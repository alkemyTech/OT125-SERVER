const express = require('express');
const router = express.Router();
const controller = require('../controllers/membersController');
const validator = require('../middleware/membersValidator')

//GET
router.get('/', controller.findAll);
router.get('/:id');
//POST
router.post('/', validator.Vcreate,controller.create);
//PATCH
router.put('/:id');
//DELETE
router.delete('/');


module.exports = router;