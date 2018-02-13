
var mysql = require('mysql');
var rdbAuth = {
    _host : 'aa1ol8w73u28tg5.cwvansxp4w1s.eu-central-1.rds.amazonaws.com',
    _user : 'klevinism',
    _pass : 'Klklkl007',
    _db   : 'ebdb',
    _port : 3306
};
class Dao{

    consturctor(host, user, pass, db, port){
        rdbAuth._host = host;
        rdbAuth._user = user;
        rdbAuth._pass = pass;
        rdbAuth._db   = db;
        rdbAuth._port = port;
    }

    getConnection(){
        this._connection = mysql.createConnection({
            host : rdbAuth._host,
            user : rdbAuth._user,
            pass : rdbAuth._pass,
            db   : rdbAuth._db,
            port : rdbAuth._port,
        });

        return this._connection.connect();
    }

    connect(){
        this._connection.connect();
    }

    select(sql){
        this._connection.query('SELECT * FROM bus', function (err, rows, fields) {
            if (err) throw err;
            this.data = rows;
        });

        return this.data;
    }

    disconnect(){
        this._connection.end();
    }
}

module.exports = Dao;