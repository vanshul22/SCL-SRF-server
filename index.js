const express = require('express');
const app = express();
const cors = require('cors');
var db = require('./database');
'use strict';

// Solve the CORS error from here
app.use(cors({
    origin: '*'
}));

// parse request body as JSON, Always use on start of the file like that.
app.use(express.json());

// API to register student (http://localhost:8080/registeruser) POST.
app.post("/registeruser", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let cource = req.body.cource;

    // here register_student is db name and it has to be same in db also.
    var sql = `INSERT INTO register_student (name, email, mobile, cource) VALUES ("${name}", "${email}", "${mobile}", "${cource}")`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        console.log('success', 'Data added successfully!');
    });
    res.send("User registered.");
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to quit.');
});