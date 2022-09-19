var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SCL_DB",
    port: process.env.PORT
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('MySQL Database is connected successfully !');
});
module.exports = conn;