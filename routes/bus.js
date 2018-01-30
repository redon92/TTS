var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('bus', { title: 'Map' });
});

module.exports = router;
