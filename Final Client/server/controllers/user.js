const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get info of curently logged in User
const user_getInfo = async (req, res) => {
  // const { id } = req.headers.params;
  const id = req.user_id;
  const user = await User.findByPk(id, {
    attributes: ["fname", "lname", "email", "gender", "phone", "address"],
  });
  if (user) {
    res.json({ user });
  } else {
    res.status(400).json({ error: "Couldn't get user info" });
  }
};

const user_update = async (req, res) => {
  const { fname, lname, email, password, gender, phone, address } = req.body;
  const new_data = { fname, lname, email, password, gender, phone, address };

  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    new_data.password = hashedPwd;
  }
  console.log('new data : ', new_data)
  try {
    const user = await User.update(new_data, {
      where: { id: req.user_id },
      plain: true,
      raw: true,
      returning: true,
      // attributes: { exclude: ["password"] },
    });
    console.log("User updated", user[1].id);
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const user_delete = async (req, res) => {
  const { user_id } = req;

  const deleted = await User.destroy({ where: { id: user_id } });
  if (deleted) {
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

module.exports = { user_getInfo, user_update, user_delete };
