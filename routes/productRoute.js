const express = require('express')
const { createProduct, getProduct, getProducts, updateProduct } = require("../controller/productController")
const router = express.Router()

router.post("/", createProduct)
router.put("/:id", updateProduct)
router.get("/:id", getProduct)
router.get("/", getProducts)

module.exports = router