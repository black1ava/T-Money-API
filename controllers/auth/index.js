const router = require("express").Router();
const {
  getTokenExpireDate,
  generateToken,
  errorHandling,
} = require("../../helpers");
const { User } = require("../../models");

router.route("/register").post(async function (req, res) {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(200).json({ user });
  } catch (error) {
    const errors = {
      username: "",
      email: "",
      password: "",
    };

    res.status(400).json(
      errorHandling(error, errors, {
        code: 11000,
        key: "email",
        message: "This email is already exist",
      })
    );
  }
});

router.route("/login").post(async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const expireDate = getTokenExpireDate();
    const token = generateToken(user._id, expireDate);

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: expireDate * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/cookie_testing").get(function (req, res) {
  const token = req.cookies["access_token"];

  res.status(200).json({ token });
});

router.route("/logout").post(function (req, res) {
  res.cookie("access_token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logout successfully" });
});

module.exports = router;
