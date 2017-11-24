var express = require('express');
var router = express.Router();

/* GET gyro page. */
router.get('/', function(req, res, next) {
  res.render('gyro', { title: 'SmartHive' });
});

module.exports = router;