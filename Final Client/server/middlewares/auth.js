const { verifyToken } = require("../modules/jwt");

const requireToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(" ")[1];
    const check = verifyToken(token);
    if (!check) {
      res.status(400).json({ error: "Invalid Token" });
    } else {
      req.user_id = check.id;
      next();
    }
  } else {
    res.status(400).json({ error: "Access denied" });
  }
};

module.exports = { requireToken };
