const User = require("../models/User");
const {
  createJWT,
  verifyToken,
  createRefreshToken,
} = require("../modules/jwt");
const bcrypt = require("bcrypt");

const signup_post = async (req, res) => {
  const { fname, lname, email, password, gender, phone, address, scope } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPwd = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPwd,
      gender,
      phone,
      address,
      scope
    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const login_post = async (req, res) => {
  const { email, password, scope } = req.body;

  const user = await User.findOne({ where: { email, scope } });
  if (user) {
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      const token = createJWT(user.id);
      // delete user.password
      res.json({ user, jwt: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

const verify_user = async (req, res) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const check = verifyToken(token);
    console.log(check);
    if (check) {
      user_id = check.id;
      user = User.findOne();
      res.json({ check });
    } else {
      res.status(400).json({ error: "Invalid Token" });
    }
  } else {
    res.status(400).json({ error: "Wrong" });
  }
};

module.exports = { signup_post, login_post, verify_user };