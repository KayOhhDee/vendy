const express = require('express')
const { createUser, loginController, getAllUser, getUser, deleteUser, updateUser, blockUser, unBlockUser } = require("../controller/userController")
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginController)

router.get("/all-users", getAllUser)
router.get("/:id", authMiddleware, isAdmin, getUser)
router.delete("/:id", deleteUser)
router.put("/edit", authMiddleware, updateUser)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser)

module.exports = router