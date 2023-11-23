const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const query = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete query[item]);

    let queryString = JSON.stringify(query);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    const products = await Product.find(JSON.parse(queryString));
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
