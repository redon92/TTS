var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    host     : 'aa1ol8w73u28tg5.cwvansxp4w1s.eu-central-1.rds.amazonaws.com',
    user     : 'klevinism',
    password : 'Klklkl007',
    database : 'ebdb',
    port     : 3306
});
var data = {};

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM bus', function (err, rows, fields) {
        if (err) throw err;
        else {
            data = rows;
            res.render('index2', {'data': data});
        }
    });
});

module.exports = router;