var express = require('express');
var router = express.Router();

const controller = require('../controllers/comment');
const validator = require('../middleware/commentsValidator');

const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');

// @todo implement middleware for owener || admin and add
router.post('/', validator.create, controller.create);
router.get('/', controller.getAll);
router.put('/:id', validator.update, controller.updateOne);
router.delete('/:id', controller.delete);

module.exports = router;
