var express = require('express');
var router = express.Router();

const controller = require('../controllers/comment');
const validator = require('../middleware/commentsValidator');

const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate');
const adminOwner = require('../middleware/adminOrOwner');

router.use(auth);
router.post('/', validator.create, controller.create);
router.get('/', isAdmin, controller.getAll);
router.use('/:id', adminOwner('Comment'));
router.put('/:id', validator.update, controller.updateOne);
router.delete('/:id', controller.delete);

module.exports = router;
