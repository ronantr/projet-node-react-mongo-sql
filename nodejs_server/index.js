const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mysql = require("mysql");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

// USE THIS BECAUSE of based of name we gave the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Connect to mySQL database
mysql
  .createConnection({
    host: "database_mysql",
    user: "root",
    password: "root",
  })
  .connect(() => console.log("MySQL connected"));

app.use(cors());
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api/auth", authRoutes);
