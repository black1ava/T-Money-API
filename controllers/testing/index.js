const router = require("express").Router();

router.route("/").get(function (req, res) {
  res.status(200).json({ message: "Testing" });
});

module.exports = router;
