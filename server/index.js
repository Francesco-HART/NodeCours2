import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import chatRoutes from "./routes/message.route";
import roomRoutes from "./routes/room.route";
import { jwtLogin, localLogin } from "./services/auth";
import passport from "passport";
import cookies from "cookies";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const { urlencoded, json } = bodyParser;
const { connect, connection } = mongoose;

const app = express();
const port = process.env.PORT || 8000;

//Set passport
app.use(passport.initialize());
passport.use(jwtLogin);
passport.use(localLogin);

app.use(cors({ credentials: true, origin: true }));
app.use(urlencoded({ extended: false }));
app.use(json());

//Routage
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", roomRoutes);
app.get("/", function (req, res) {
  res.send("hello world");
});

//Set up default mongoose connection
app.use(
  cookies.express({
    keys: [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXJhYWh5dEBnbWFpbC5jb20iLCJpYXQiOjE2MzgzNjg0NjguMzEzLCJleHAiOjE2Mzg0MTE2Njh9.ENVEm3lxmOOCOfYVMdWLKdUoCmL-UA7S_GmZbup2H2k",
    ],
  })
);

var mongoDB =
  "mongodb+srv://sarah:password_user@cluster0.oofm1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

//Get the default connection
var db = connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Utiliser les routes

const server = app.listen(port, () => {
  console.log("Server app listening on port " + port);
});
// //socket
// const io = new Server(server, {
//   transports: ["websocket", "polling"],
//   origins: "*:*",
//   cors: {
//     origin: "http://localhost:3000",
//     transports: ["websocket", "polling"],
//     credentials: true,
//   },
// });
const httpServer = createServer();

// io.listen(server);
const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    socket.emit("hello", "world");
  });
});

io.on("hello", (arg) => {
  console.log("iciiiiiiiiiiiii");

  socket.emit("hello", "world");
});

httpServer.listen(5000);
