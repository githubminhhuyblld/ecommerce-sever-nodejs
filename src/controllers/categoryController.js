const Category = require("../models/Category");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addCategory: async (req, res) => {
    try {
      const existingCategory = await Category.findOne({ name: req.body.name });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }

      const category = await new Category({
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
      });
      const savedCategory = await category.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

module.exports = categoryController;
