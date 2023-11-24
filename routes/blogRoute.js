const express = require("express");
const router = express.Router();
const { createBlog } = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBlog)

module.exports = router;
