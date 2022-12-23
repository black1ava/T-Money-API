const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { CustomErrorLogin } = require("../../helpers");
const jwt = require("jsonwebtoken");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Email is incorrect"],
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Your password is too short"],
  },
});

Schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

Schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    console.log("email");
    throw new CustomErrorLogin("Incorrect email");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new CustomErrorLogin("", "Incorrect password");
  }

  return user;
};

Schema.statics.currentUser = async function (req) {
  const token = req.cookies["access_token"];
  const id = jwt.verify(token, "secret", function (error, decoded) {
    const { id } = decoded;
    return id;
  });

  return await this.findById(id);
};

module.exports = mongoose.model("user", Schema);
