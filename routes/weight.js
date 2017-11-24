var express = require('express');
var router = express.Router();

/* GET weight page. */
router.get('/', function(req, res, next) {
  res.render('weight', { title: 'SmartHive' });
});

module.exports = router;