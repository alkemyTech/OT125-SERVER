const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController');
const isAdminMIddleware=require('../Middleware/isAdmin');

/* GET categories */
router.get('/',controller.getCategories);
router.get('/:id',controller.getCategory);

/* POST categories */
router.post('/:id',isAdminMIddleware,controller.createCategory);

/* PATCH categories */
router.patch('/:id',isAdminMIddleware,controller.updateCategory);

/* DELETE categories */
router.delete('/:id',isAdminMIddleware,controller.deleteCategory);


module.exports = router;