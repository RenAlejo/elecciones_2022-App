const mysql = require('mysql');

class Database {

    constructor(){
        this.mysql = mysql;
        this.dbHost = process.env.DBHOST;
        this.dbUser = process.env.DBUSER;
        this.dbPass = process.env.DBPASS;
        this.dataBase = process.env.DATABASE;
    }
    
    connectDb() {
        const con = this.mysql.createConnection({
            host: this.dbHost,
            user: this.dbUser,
            password: this.dbPass,
            database: this.dataBase
        });

        con.connect(function(err) {
        if (err) throw err;
            console.log("Conexión establecida con la base de datos");
        });
    }
}


module.exports = Database;