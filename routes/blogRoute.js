const express = require("express");
const router = express.Router();
const { createBlog, updateBlog, getBlog } = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBlog)
router.put("/:id", authMiddleware, isAdmin, updateBlog)
router.get("/:id", getBlog)

module.exports = router;
