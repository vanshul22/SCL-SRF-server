var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "register_student",
    port: process.env.PORT
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('MySQL Database is connected successfully !');
});
module.exports = conn;