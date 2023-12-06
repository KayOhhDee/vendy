const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBID");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const enquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const enquiry = await Enquiry.findByIdAndDelete(id);
    res.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const enquiry = await Enquiry.findById(id);
    res.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const enquirys = await Enquiry.find();
    res.json(enquirys);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getCategories
};
