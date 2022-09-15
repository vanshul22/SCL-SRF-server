const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');
'use strict';

// Solve the CORS error from here
app.use(cors({
    origin: '*'
}));

// parse request body as JSON, Always use on start of the file like that.
app.use(express.json());

// API to Getting homepage response. (http://localhost:8080/) GET.
app.get("/", (req, res) => {
    res.send("Server Running....");
})

// API to register student (http://localhost:8080/registeruser) POST.
app.post("/registeruser", (req, res) => {
    // taking all data from Body of request...
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let cource = req.body.cource;

    // here register_student is tablename name and it has to be same in db also.
    var sql = `INSERT INTO register_student (name, email, mobile, cource) VALUES ("${name}", "${email}", "${mobile}", "${cource}")`;

    // Saving data into mySQL database from these lines...
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Record Inserted');
        console.log('Success,', 'Data added successfully!');
    });
    res.send("User registered.");
});

// API to signup users (http://localhost:8080/signup) POST.
app.post("/signup", (req, res) => {
    // taking all data from Body of request...
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = req.body.password;

    // here signup is tablename name and it has to be same in db also.
    var sql = `INSERT INTO signup (name, email, mobile, password) VALUES ("${name}", "${email}", "${mobile}", "${password}")`;

    // Saving data into mySQL database from these lines...
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Record Inserted');
        console.log('Success', 'Data added successfully!');
    });
    res.send("Signup Successfull");
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to quit.');
});