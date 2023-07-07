const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
      .populate("products.product", "name price")
      .then(order => {
        if (!order) {
          return res.status(400).json({
            error: "No order found in Database",
          });
        }
        req.order = order;
        next();
      })
      .catch(err => {
        res.status(400).json({
          error: "Error retrieving order from Database",
        });
      });
  };
  

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No Orders found in Database",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.updateMany(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};