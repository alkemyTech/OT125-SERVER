const express = require('express');
const router = express.Router();
const validator =require('../middleware/membersValidator')

const membersControllers = require('../controllers/members');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

//router.use(auth,isAdmin);

router.get('/',membersControllers.findAll);
router.get('/:id', validator.validateId,membersControllers.findOne);


router.post('/',validator.Vcreate, membersControllers.create);

router.put('/:id',validator.validateId, membersControllers.update);

router.delete('/:id',validator.validateId, membersControllers.destroy);


module.exports = router;