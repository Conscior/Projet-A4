const express = require("express");
const { mssDB, mongoDB } = require("./databases/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const componentRouter = require("./routes/component");

const app = express();

app.use(express.json()); // Middleware - Body parser that expose the body of a req in req.body
app.use(express.urlencoded({ extended: false })); // Middleware - for html post form
app.use(cookieParser());
app.use(cors());

try {
  //BDD
  mongoDB;
  mssDB;

  //Server
  app.listen(3100, () =>
    console.log("server running on port 3100")
  );
} catch (error) {
  console.log(error);
}

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/components", componentRouter);
