const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  getUserWishlist,
  getUserOrders,
  getAccountSettings,
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/user/wishlist/:userId", isSignedIn, isAuthenticated, getUserWishlist);
router.get("/user/orders/:userId", isSignedIn, isAuthenticated, getUserOrders);
router.get("/user/account-settings/:userId", isSignedIn, isAuthenticated, getAccountSettings);

module.exports = router;
