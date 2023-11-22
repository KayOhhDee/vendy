const express = require('express')
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("../controller/productController")
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/", isAdmin, authMiddleware, createProduct)
router.put("/:id", isAdmin, authMiddleware, updateProduct)
router.get("/:id", getProduct)
router.get("/", getProducts)
router.delete("/:id", isAdmin, authMiddleware, deleteProduct)

module.exports = router