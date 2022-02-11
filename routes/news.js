const express = require('express');
const router = express.Router();
const {
  validatorCreate,
  validatorGetOne,
  validatorUpdate,
  validatorRemove,
} = require('../middleware/newValidation');
const {
  getAll,
  getOne,
  create,
  update,
  remove,
  getComments,
} = require('../controllers/newsController');
const isAdmin = require('../middleware/isAdmin');
const authenticate = require('../middleware/authenticate');

router.get('/', getAll);
router.get('/:id', authenticate, isAdmin, validatorGetOne, getOne);
router.post('/', authenticate, isAdmin, validatorCreate, create);
router.put('/:id', authenticate, isAdmin, validatorUpdate, update);
router.delete('/:id', authenticate, isAdmin, validatorRemove, remove);
router.get('/:id/comments', getComments);

module.exports = router;
