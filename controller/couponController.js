const Coupon = require("../models/couponModel");
const validateMongoDBId = require("../utils/validateMongoDBID");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const coupon = await Coupon.findByIdAndDelete(id);
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon
};
