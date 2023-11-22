const express = require('express')
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("../controller/productController")
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/", authMiddleware, isAdmin, createProduct)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.get("/:id", getProduct)
router.get("/", getProducts)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router