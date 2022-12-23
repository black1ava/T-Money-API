const jwt = require("jsonwebtoken");

module.exports = function (id, maxAge) {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};
