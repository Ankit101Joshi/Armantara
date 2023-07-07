const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .then(product => {
      if (!product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: "Internal server error",
      });
    });
};



exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image upload'
      });
    }

    // Destructure fields and files
    const { name, description, price, category, stock } = fields;
    const { photo } = files;

    // Check if all required fields are present
    if (!name || !description || !price || !category || !stock || !photo) {
      return res.status(400).json({
        error: 'Please include all the fields'
      });
    }

    if (photo.size > 3081752) {
      return res.status(400).json({
        error: 'File size too big!'
      });
    }

    let product = new Product(fields)

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.filepath)
      product.photo.contentType = files.photo.mimetype
    }

    // Save product to the database
    product.save()
      .then(savedProduct => {
        res.json(savedProduct);
      })
      .catch(error => {
        res.status(400).json({
          error: 'Saving product in the database failed'
        });
      });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

//This is a middleware
exports.photo = (req, res, next) =>{
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

//delete controller
exports.deleteProduct = async (req, res) => {
  const product = req.product;
  try {
    await product.deleteOne();

    res.json({
      message: "Deleted the product successfully",
      deletedProduct: product,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to delete the product",
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



exports.updateProduct = (req, res) =>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image upload'
      });
    }

    // Destructure fields and files
    // const { name, description, price, category, stock } = fields;
    // const { photo } = files;


    if (photo.size > 3081752) {
      return res.status(400).json({
        error: 'File size too big!'
      });
    }

    //updation code
    let product = req.product
    product = _.extend(product, fields)

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.filepath)
      product.photo.contentType = files.photo.mimetype
    }

    // Save product to the database
    product.save()
      .then(savedProduct => {
        res.json(savedProduct);
      })
      .catch(error => {
        res.status(400).json({
          error: 'Updation of product in the database failed'
        });
      });
  });
}

//product listing

exports.getAllProducts = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec();

    if (products.length === 0) {
      return res.status(400).json({
        error: "No products found",
      });
    }

    res.json(products);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};



exports.getAllUinqueCategories = (req, res) =>{
  Product.distinct("category", {}, (err, category) =>{
    if(err){
      return res.statu(400).json({
        error: "No category found"
      })
    }
    res.json(category)
  })
}

//middleware
exports.updateStock = (req, res, next) =>{

    let myOperations = req.body.order.products.map(prod =>{
      return{
        updateOne: {
          fliter: {_id: prod._id},
          update: {$inc: {stock: -prod.count, sold: +prod.count}}
        }
      }
    })
    
    Product.bulkWrite(myOperations, {}, (err, products) =>{
      if(err){
        return res.status(400).json({
          error: "Bulk operation failed"
        })
      }
      next();
    })
}