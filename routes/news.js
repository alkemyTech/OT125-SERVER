const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove} = require('../controllers/newsController')

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.patch('/', update);
router.delete('/:id', remove);

module.exports = router;