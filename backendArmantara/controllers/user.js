const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "No user was found in the database",
      });
    }
    console.log(user);
    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(400).json({
        error: "You are not authorized to update this user profile",
      });
    }

    user.salt = undefined;
    user.encry_password = undefined;

    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No order found for this account",
        });
      }
      return res.json(orders);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

exports.getUserWishlist = (req, res) => {
  User.findById(req.profile._id)
    .populate("wishlist", "name price")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user found",
        });
      }
      res.json(user.wishlist);
    });
};

exports.getUserOrders = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("products.product", "name price")
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: "No orders found",
        });
      }
      res.json(orders);
    });
};

exports.getAccountSettings = (req, res) => {
  const { _id, name, email } = req.profile;
  return res.json({
    _id,
    name,
    email,
  });
};
