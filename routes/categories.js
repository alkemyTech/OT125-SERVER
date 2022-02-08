const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController');
const {
  createValidator,
  getOneValidator,
} = require('../middleware/categoryValidation');
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');


/* GET categories */
router.use(auth, isAdmin)

router.get('/', controller.getCategories);
router.get('/:id', getOneValidator, controller.getCategory);

/* POST categories */
router.post('/', createValidator, controller.createCategory);

/* PATCH categories */
router.patch('/:id', updateValidator, controller.updateCategory);

/* DELETE categories */
router.delete('/:id', controller.deleteCategory);

module.exports = router;
