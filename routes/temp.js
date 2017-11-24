var express = require('express');
var router = express.Router();

/* GET temp page. */
router.get('/', function(req, res, next) {
  res.render('temp', { title: 'SmartHive' });
});

module.exports = router;