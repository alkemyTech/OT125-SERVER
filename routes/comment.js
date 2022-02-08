var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');

router.get('/', auth, isAdmin, commentController.getAll);

module.exports = router;
