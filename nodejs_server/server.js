const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mysql = require('mysql');

const PORT = 4000;

// USE THIS BECAUSE of based of name we gave the database
mongoose.connect('mongodb://database_mongodb:27017/mydb').then(() => console.log("connected to mongodb")).catch((err) => console.log(err))

// Connect to mySQL database
mysql.createConnection({
    host: "database_mysql",
    user: "root",
    password: "root"
}).connect(() => console.log("MySQL connected"))

// Gives user a response when visiting localhost:4000
app.get('/', function (req, res) {
    res.json({ "Whats up": "world hows life?" });
});

// Starts up server and displays the port the server is running on
app.listen(PORT, function () {
    console.log('Your node js server is running on PORT:', PORT);
})
