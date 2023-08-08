const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  updateOrderStatusByOrderId // New route handler
} = require("../controllers/order");

// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Routes

// Create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// Read
router.get(
  "/order/all/:userId",
  // isSignedIn,
  // isAuthenticated,
  // isAdmin,
  getAllOrders
);

router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatusByOrderId // Use the new route handler for updating order status
);

// Get all orders (Admin)
router.get("/orders", isSignedIn, isAuthenticated, isAdmin, getAllOrders);
// Order Status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;
