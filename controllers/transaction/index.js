const router = require("express").Router();
const { authorized } = require("../../middleware");
const { User, Transaction, Category } = require("../../models");
const { errorHandling } = require("../../helpers");

router.use(authorized);

router.route("/").get(async function (req, res) {
  const user = await User.currentUser(req);
  try {
    const transactions = await Transaction.find({ user_id: user._id });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/").post(async function (req, res) {
  const { title, amount, date, is_expense, category_id } = req.body;

  try {
    const user = await User.currentUser(req);

    await Category.findById(category_id);

    const transaction = await Transaction.create({
      title,
      amount,
      date,
      is_expense,
      category_id,
      user_id: user._id,
    });

    res.status(200).json(transaction);
  } catch (error) {
    const errors = {
      title: "",
      amount: "",
      date: "",
      category_id: "",
    };

    res.status(400).json(
      errorHandling(error, errors, null, [
        {
          name: "category",
          key: "category_id",
        },
        {
          name: "date",
          key: "date",
        },
      ])
    );
  }
});

router.route("/:id").get(async function (req, res) {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Transaction not found" });
  }
});

router.route("/:id").put(async function (req, res) {
  const { title, amount, date, is_expense, category_id } = req.body;
  const { id } = req.params;

  try {
    await Transaction.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        date,
        is_expense,
        category_id,
      },
      {
        runValidators: true,
      }
    );

    res.status(200).json({ message: "Update transaction successfully" });
  } catch (error) {
    const errors = {
      title: "",
      amount: "",
      date: "",
      category_id: "",
    };

    res.status(400).json(
      errorHandling(error, errors, null, [
        {
          name: "category",
          key: "category_id",
        },
        {
          name: "date",
          key: "date",
        },
      ])
    );
  }
});

router.route("/:id").delete(async function (req, res) {
  const { id } = req.params;

  try {
    await Transaction.findByIdAndDelete(id);

    res.status(200).json({ message: "Delete transaction successfully" });
  } catch (error) {
    res.status(400).json({ message: "Transaction not found" });
  }
});

module.exports = router;
