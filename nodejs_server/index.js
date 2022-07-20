import express from "express";
import mongoose from "mongoose";
import mysql from "mysql";
import cors from "cors";
import refreshTokenRoutes from "./routes/refreshToken.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import messagesRoutes from "./routes/messages.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { Socket } from "socket.io";

const app = express();
config();

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
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/messages", messagesRoutes);

// const io = new Server(httpServer, {
//   // ...
// });

// io.on("connection", (socket) => {
//   // ...
// });

const io = new Server(server, {
  cors: {
    origins: "http://127.0.0.1::3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("add-user", userId);
  });
  socket.on("send-msg", (data) => {
    console.log("send-msg", data);
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("online users ---", onlineUsers);
    console.log(onlineUsers.get("62d68b595d896b383472a21a"));
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-msg", data.message);
    }
  });
});
