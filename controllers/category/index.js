const router = require("express").Router();
const { Category, User } = require("../../models");
const { authorized } = require("../../middleware");
const { errorHandling } = require("../../helpers");

router.use(authorized);

router.route("/").get(async function (req, res) {
  const user = await User.currentUser(req);
  const categories = await Category.find({ user_id: user._id });

  return res.status(200).json(categories);
});

router.route("/").post(async function (req, res) {
  const { name } = req.body;
  const user = await User.currentUser(req);

  try {
    const category = await Category.create({ name, user_id: user._id });
    res.status(200).json(category);
  } catch (error) {
    const errors = {
      name: "",
    };

    res.status(400).json(errorHandling(error, errors));
  }
});

router.route("/:id").get(async function (req, res) {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "Category not found" });
  }
});

router.route("/:id").put(async function (req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      res.status(400).json({ name: "Please enter category name" });
    }

    await Category.findByIdAndUpdate(id, {
      name,
    });

    res.status(200).json({ message: "Update category successfully" });
  } catch (error) {
    const errors = {
      name: "",
    };

    res.status(400).json(errorHandling(error, errors));
  }
});

router.route("/:id").delete(async function (req, res) {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Delete category successfully" });
  } catch (error) {
    const errors = {
      name: "",
    };

    res.status(400).json(errorHandling(error, errors));
  }
});

module.exports = router;
