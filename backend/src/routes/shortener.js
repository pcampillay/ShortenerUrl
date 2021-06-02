var express = require('express');
var router = express.Router();

var shortener = require('../controllers/shortener');

router.get('/:id', shortener.ValidIdShortener);
// router.post('/', captcha.ValidCaptcha);



module.exports = router;