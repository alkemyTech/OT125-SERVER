const express = require('express');
const router = express.Router();

const membersControllers = require('../controllers/members');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

router.use(auth,isAdmin);

router.get('/', membersControllers.findAll);

router.post('/', membersControllers.create);

//router.put('/:id', membersControllers.edit);

router.put('/:id', membersControllers.update);

router.delete('/:id', membersControllers.destroy);





module.exports = router;
