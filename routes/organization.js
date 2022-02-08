const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');
const validation = require('../middleware/orgValidation');
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/authenticate')


router.get('/public/', controller.orgGetOne);

router.post('/public/', auth, isAdmin, validation.updateValidation, controller.orgUpdate);


module.exports = router;
