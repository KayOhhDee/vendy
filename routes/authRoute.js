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
  resetPassword
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh-token", handleRefreshToken);
router.put("/update-password", authMiddleware, updatePassword);
router.post("/forgot-password", forgotPasswordToken);
router.post("/reset-password/:token", resetPassword);

router.get("/all-users", getAllUser);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
