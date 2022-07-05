const mongoose = require('mongoose');
const express = require("express");
const port = process.env.PORT || 3000;
const HttpRouter = require("./routes/httpCodes");
const UserRouter = require("./routes/users");
const SecurityRouter = require("./routes/security");
const checkAuthentication = require("./middlewares/checkAuthentication");
const app = express();

app.use(express.json());

app.get("/", (_, res, __) => {
  res.send("Hello World!");
});

app.use(SecurityRouter);
app.use(UserRouter);
app.use(checkAuthentication, HttpRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
const PORT = 4000;

// USE THIS BECAUSE of based of name we gave the database
mongoose.connect('mongodb://database_mongodb:27017/').then(() => console.log("connected to mongodb")).catch((err) => console.log(err))

// Connect to postgress database

postgress.createConnection({   
    host: "database_postgress",
    user: "root",
    password: "password"
}).connect(() => console.log("postgress connected"))


app.get('/user/make', (req, res) => {
    console.log(req.body);
    res.json({
      message: 'Objet créé !'
    });
  });

  app.get('/user/delete', (req, res) => {
    console.log(req.body);
    res.json({
      message: 'Objet delete !'
    });
  });