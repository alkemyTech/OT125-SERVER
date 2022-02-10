var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');

// @todo implement middleware for owener || admin and add
router.post('/', commentController.create);
router.get('/', commentController.getAll);
router.put('/:id', commentController.updateOne);
router.delete('/:id', commentController.delete);

module.exports = router;
