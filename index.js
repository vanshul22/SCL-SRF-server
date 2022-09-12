const express = require('express');
const app = express();
var db = require('./database');
'use strict';

// parse request body as JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/registeruser", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let cource = req.body.cource;

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