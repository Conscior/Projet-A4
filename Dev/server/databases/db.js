const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");

// Microsoft SQL Server
dbName = "A4L";
dbUser = "openpg";
dbPwd = "openpgpwd";
host = "localhost";
dialect = "postgres";

const sequelize = new Sequelize(
    dbName, dbUser, dbPwd,
{
  host: host,
  dialect: dialect,
//   dialectOptions: {
//     encrypt: true,
//   },
}
);


const mssDB = sequelize.authenticate()

const mongoDB_URI = "mongodb://localhost:27017/A4L";
const mongoDB = mongoose.connect(mongoDB_URI);

module.exports = { sequelize, mssDB, mongoDB };
