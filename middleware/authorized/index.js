const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies["access_token"];

  if (!token) {
    res.status(401).json({ message: "Unathorized access" });
    return;
  }

  jwt.verify(token, "secret", function (error, decoded) {
    if (error) {
      res.status(401).json({ message: "Unathorized access" });
      return;
    }

    next();
  });
};
