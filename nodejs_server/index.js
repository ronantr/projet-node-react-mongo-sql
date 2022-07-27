import express from "express";
import mongoose from "mongoose";
import mysql from "mysql";
import cors from "cors";
import refreshTokenRoutes from "./routes/refreshToken.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import messagesRoutes from "./routes/messages.js";
import friendsRoutes from "./routes/friends.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
config();

// USE THIS BECAUSE of based of name we gave the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/friend", friendsRoutes);
