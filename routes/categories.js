const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController')
const { createValidator, getOneValidator,getAllValidator } = require('../middleware/categoryValidation')
const { isAdmin } = require('../middleware/isAdmin')
const { authenticate: auth } = require('../middleware/authenticate')

/* GET categories */
router.get('/', auth, isAdmin,getAllValidator, controller.getCategories);
router.get('/:id', auth, isAdmin, getOneValidator, controller.getCategory);

/* POST categories */
router.post('/', auth, isAdmin, createValidator, controller.createCategory);

/* PATCH categories */
router.patch('/:id', auth, isAdmin, controller.updateCategory);

/* DELETE categories */
router.delete('/:id', auth, isAdmin, getOneValidator, controller.deleteCategory);


module.exports = router;