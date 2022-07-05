const express = require("express");
const http = require('http')
const { mssDB, mongoDB } = require("./databases/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const orderRouter = require("./routes/order");
const storeRouter = require("./routes/store");

const app = express();

app.use(express.json()); // Middleware - Body parser that expose the body of a req in req.body
app.use(express.urlencoded({ extended: false })); // Middleware - for html post form
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app)

try {
  //BDD
  mongoDB;
  mssDB;


  //Sockets
  const io = require("socket.io")(server, { cors: { origin: "*" } });
  io.on("connection", function (socket) {
    console.log(socket.id);
  });

  //Server
 server.listen(3000, () =>
    console.log("server running on port 3000")
  );

} catch (error) {
  console.log(error);
}

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/articles", articleRouter);
app.use("/orders", orderRouter);
app.use("/store", storeRouter);
