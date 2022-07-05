const { DataTypes } = require("sequelize");
const { sequelize } = require("../databases/db");

const User = sequelize.define("user", {
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  scope: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = User;
