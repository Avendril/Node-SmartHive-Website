var express = require('express');
var router = express.Router();

/* GET humidity page. */
router.get('/', function(req, res, next) {
  res.render('humidity', { title: 'SmartHive' });
});

module.exports = router;