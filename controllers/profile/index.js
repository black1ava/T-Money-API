const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { authorized } = require("../../middleware");
const { User, Category } = require("../../models");

router.use(authorized);

router.route("/").get(async function (req, res) {
  const user = await User.currentUser(req);

  const userObject = user.toObject();
  delete userObject.password;

  res.status(200).json(userObject);
});

module.exports = router;
