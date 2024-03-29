const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
'use strict';

// Creating JWT secret. try to move this in environment variables.
const JWT_Secret = "#superiorCodeLabs@";

// Solve the CORS error from here
app.use(cors({
    origin: '*'
}));

//middleware to read req.body.<params>
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

    try {
        // here register_student is tablename name and it has to be same in db also.
        var sql = `INSERT INTO register_student (name, email, mobile, cource) VALUES ("${name}", "${email}", "${mobile}", "${cource}")`;

        // Saving data into mySQL database from these lines...
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Record Inserted');
            console.log('Success,', 'Data added successfully!');
        });
        res.send("User registered.");
    } catch (error) {
        console.log(error);
    }
});

// API to signup users (http://localhost:8080/signup) POST.
app.post("/signup", async (req, res) => {
    // Creating salt to add in password.
    const salt = await bcrypt.genSalt(10);
    // Creating secured hash password.
    const secretPassword = await bcrypt.hash(req.body.password, salt);
    // taking all data from Body of request...
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = secretPassword;

    try {
        // here users is tablename and it has to be same in db also.
        var sql = `INSERT INTO users (name, email, mobile, password) VALUES ("${name}", "${email}", "${mobile}", "${password}")`;
        // Saving data into mySQL database from these lines...
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Success:', 'Data added successfully!');
            res.send("Signup Successfull");
        });
    } catch (error) {
        console.log(error);
    }
});

// API to login users (http://localhost:8080/login) POST.
app.post("/login", (req, res) => {
    // taking all data from Body of request...
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    // variable for checking user login status...
    let isLoggedIn = false;
    let authToken;

    // here users is tablename and it has to be same in db also.
    const sql = `SELECT * FROM users WHERE email = ?`;

    // checking data into mySQL database from these lines...
    db.query(sql, [userEmail], (err, result, fields) => {
        try {
            if (err) throw err;
            if (userPassword !== result[0].password) {
                console.log("Password does not matched.");
                isLoggedIn = "invalid password";
            }
            if (userPassword === result[0].password) {
                console.log("Password matched successfully");
                isLoggedIn = "password matched";
                // Creating token to send in frontend for authentication.
                const data = {
                    users: { id: result[0].id }
                }
                authToken = jwt.sign(data, JWT_Secret);
            }

        } catch (error) {
            console.log("Email is not registered...");
            isLoggedIn = "invalid email";
        }
        res.send({ isLoggedIn, authToken });
    });
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to quit.');
});