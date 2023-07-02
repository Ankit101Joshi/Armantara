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

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories Found",
      });
    }
    res.json(categories);
  });
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

exports.removeCategory = (req, res) => {
    const category = req.category;
  
    category.deleteOne()
      .then(() => {
        res.json({
          message: `Successfully deleted category`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: `Failed to delete category ${category}`,
        });
      });
  };
  
  
  
