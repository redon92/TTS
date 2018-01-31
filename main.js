var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');
var buses = require('./routes/bus');

var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : 'aa1ol8w73u28tg5.cwvansxp4w1s.eu-central-1.rds.amazonaws.com',
    user     : 'klevinism',
    password : 'Klklkl007',
    database : 'ebdb',
    port     : 3306
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bus', buses);


app.post('/bus/add', urlencodedParser, function (req, res){
    var reply='';

    connection.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO bus (Name, Lat, Lon) VALUES ('"+req.body.name+"', '"+req.body.latitude+"','"+req.body.longitude+"')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted ");
        });
    });

    reply += "Bus name : " + req.body.name + "<br/>";
    reply += "Bus lat is : " + req.body.latitude + "<br/>";
    reply += "Bus long is : " + req.body.longitude + "<br/>";
    res.send(reply);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
