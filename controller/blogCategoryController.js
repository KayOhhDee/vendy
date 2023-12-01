const Category = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBID");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories
};
