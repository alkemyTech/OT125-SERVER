const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove} = require('../controllers/newsController');
const isAdminMIddleware=require('../Middleware/isAdmin');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/',isAdminMIddleware, create);
router.patch('/',isAdminMIddleware ,update);
router.delete('/:id',isAdminMIddleware ,remove);

module.exports = router;