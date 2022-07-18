const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mysql = require('mysql');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

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
    res.send({ "Whats up": "world hows life?" });
});

// app.get('/users', function (req, res) {
//   res.send({ "Welcome to users page !": "world hows life?" });
// });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


// Starts up server and displays the port the server is running on
app.listen(PORT, function () {
    console.log('Your node js server is running on PORT:', PORT);
});


// app.get('/user/make', (req, res) => {
//     console.log(req.body);
//     res.send({
//       message: 'Objet créé !'
//     });
//   });

//   app.get('/user/delete', (req, res) => {
//     console.log(req.body);
//     res.send({
//       message: 'Objet delete !'
//     });
//   });