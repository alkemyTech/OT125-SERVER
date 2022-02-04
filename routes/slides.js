var express = require('express');
const slidesControllers= require('../controllers/slidesController')
var router = express.Router();


router.get('/',  (req, res) => {
    res.send('slides');
});


module.exports = router;