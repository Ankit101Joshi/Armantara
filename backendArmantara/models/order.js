const mongoose = require('mongoose');
const { Schema } = mongoose;

const productCartSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  name: String,
  count: Number,
  price: Number
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new Schema({
  products: [productCartSchema],
  transaction_id: {},
  amount: { type: Number },
  address: String,
  status: {
    type: String,
    default: "Received",
    enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
  },
  updated: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  ProductCart
};
