const express = require('express')
const { createProduct, getProduct } = require("../controller/productController")
const router = express.Router()

router.post("/", createProduct)
router.get("/:id", getProduct)

module.exports = router