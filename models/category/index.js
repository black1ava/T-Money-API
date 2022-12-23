const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
  },
  user_id: String,
});

module.exports = mongoose.model("category", Schema);
