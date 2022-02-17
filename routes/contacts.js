const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactsController');
const auth = require('../middleware/authenticate');
const validation = require('../middleware/contactValidator');
const isAdmin = require('../middleware/isAdmin');

router.post('/', validation.contactValidation, controller.createContact);
router.get('/', auth, isAdmin, controller.getContacts);



module.exports = router;