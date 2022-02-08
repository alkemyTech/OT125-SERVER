const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles');
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

router.get('/', auth, isAdmin, roleController.obtain);

module.exports = router;
