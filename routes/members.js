const express = require('express');
const router = express.Router();

const membersControllers = require('../controllers/members');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

router.use(auth);

router.post('/', membersControllers.create);

router.put('/:id', membersControllers.edit);

router.put('/:id', membersControllers.update);

router.delete('/:id', membersControllers.destroy);

router.use(isAdmin);

router.get('/', membersControllers.findAll);

module.exports = router;
