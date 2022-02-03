const express = require('express');
const router = express.Router();
const {validatorCreate, validatorGetOne, validatorRemove} = require('../middleware/newValidation')
const { getAll, getOne, create, update, remove} = require('../controllers/newsController')

router.get('/', getAll);
router.get('/:id', validatorGetOne, getOne);
router.post('/', validatorCreate, create);
router.patch('/:id', update);
router.delete('/:id', validatorRemove , remove);

module.exports = router;