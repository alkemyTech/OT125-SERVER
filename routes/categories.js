const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController')

/* GET categories */
router.get('/',controller.getCategories);
router.get('/:id',controller.getCategory);

/* POST categories */
router.post('/:id',controller.createCategory);

/* PATCH categories */
router.patch('/:id',controller.updateCategory);

/* DELETE categories */
router.delete('/:id',controller.deleteCategory);


module.exports = router;