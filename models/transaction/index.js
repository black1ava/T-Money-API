const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter transaction title"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter transaction amount"],
  },
  date: {
    type: Date,
    required: [true, "Please enter"],
  },
  is_expense: {
    type: Boolean,
    default: false,
  },
  user_id: String,
  category_id: {
    type: String,
    required: [true, "Please choose a category"],
  },
});

Schema.pre("update", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("transaction", Schema);
