const Category = require("../models/category");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const cate = await Category.findById(id).exec();
    if (!cate) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.json({ category: savedCategory });
  } catch (err) {
    return res.status(400).json({
      error: "Not able to save category in DB",
    });
  }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    if (categories.length === 0) {
      return res.status(400).json({
        error: "No Categories Found",
      });
    }
    res.json(categories);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.removeCategory = async (req, res) => {
  const category = req.category;

  try {
    await category.deleteOne();
    res.json({
      message: `Successfully deleted category`,
    });
  } catch (err) {
    res.status(400).json({
      error: `Failed to delete category ${category}`,
    });
  }
};