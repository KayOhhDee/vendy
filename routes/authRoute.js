const express = require("express");
const {
  createUser,
  login,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  cart,
  getCart,
  emptyCart,
  applyCoupon,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/logout", logout);
router.get("/refresh-token", handleRefreshToken);
router.put("/update-password", authMiddleware, updatePassword);
router.post("/register", createUser);
router.post("/login", login);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);

router.get("/all-users", getAllUser);
router.get("/cart", authMiddleware, getCart);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.put("/edit", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);
router.post("/cart", authMiddleware, cart);
router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteUser);

module.exports = router;
