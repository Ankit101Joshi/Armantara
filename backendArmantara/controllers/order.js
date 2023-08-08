const { Order, ProductCart } = require("../models/order");


exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .populate("products.product", "name price") 
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No Orders found in Database",
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

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          error: "No order found in Database",
        });
      }
      req.order = order;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        error: "Error retrieving order from Database",
      });
    });
};

exports.updateOrderStatus = (req, res) => {
  const orderId = req.params.orderId;
  const status = req.body.status;

  Order.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true },
    (err, updatedOrder) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update order status",
        });
      }
      res.json(updatedOrder);
    }
  );
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

exports.updateOrderStatusByOrderId = async (req, res) => {
  const orderId = req.params.orderId;
  const status = req.body.status;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(400).json({
        error: "Failed to update order status",
      });
    }

    res.json(updatedOrder);
  } catch (err) {
    return res.status(400).json({
      error: "Failed to update order status",
    });
  }
};
