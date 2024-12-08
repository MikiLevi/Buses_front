import express, { Express } from "express";
import "dotenv/config";
import router from "./router/router";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";

import { Server, Socket } from "socket.io";
import http from "http";

import loadInitialData from "./src/initailData";
import socketMain from "./src/socket/socketMain";

const app: Express = express();
const server = http.createServer(app);

loadInitialData().catch(console.error);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(router);

// התחברות ל-MongoDB עם לוגים צבעוניים
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log(chalk.cyanBright("Connected to MongoDB Atlas"));
  })
  .catch((error) => {
    console.error(chalk.red("Error connecting to MongoDB:", error)); // לוג אדום כשיש שגיאה
  });

// io.on("connection", (socket) => {
//   console.log(`user connecting ${socket.id}`);

//   socket.on("joinRoom", (roomName) => {
//     socket.join(roomName);
//     console.log(`${socket.id} Joined room${roomName}`);
//     socket.emit("Message", `Wollcom room${roomName}`);
//   });

//   socket.on("SendMassegeToRoom", (data) => {
//     const { roomName, message, userName } = data;
//     io.to(roomName).emit("receiveMessage", {
//       userName,
//       message,
//       timestemp: new Date().toISOString,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnect ${socket.id}`);
//   });
// });
socketMain(io);

server.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
  );
});
