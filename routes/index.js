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

connection.connect();
connection.query('SELECT * FROM bus', function (err, rows, fields) {
    if (err) throw err;
    data = rows;
    console.log(data);
});
connection.end();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(data);

    res.render('main', {'data': data});
});

module.exports = router;
