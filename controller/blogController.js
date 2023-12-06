const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBID");
const cloudinaryImageUpload = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const blog = await Blog.findByIdAndDelete(id);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDBId(blogId);
  const blog = await Blog.findById(blogId);
  const loggedInUserId = req?.user?._id;
  const isLiked = blog?.isLiked;
  const hasAlreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loggedInUserId.toString()
  );

  if (hasAlreadyDisliked) {
    await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { dislikes: loggedInUserId }, isDisliked: false },
      { new: true }
    );
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: loggedInUserId }, isLiked: false },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { likes: loggedInUserId }, isLiked: true },
      { new: true }
    );
    res.json(blog);
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDBId(blogId);
  const blog = await Blog.findById(blogId);
  const loggedInUserId = req?.user?._id;
  const isDisliked = blog?.isDisliked;
  const hasAlreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loggedInUserId.toString()
  );

  if (hasAlreadyLiked) {
    await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: loggedInUserId }, isLiked: false },
      { new: true }
    );
  }

  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { dislikes: loggedInUserId }, isDisliked: false },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { dislikes: loggedInUserId }, isDisliked: true },
      { new: true }
    );
    res.json(blog);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const uploader = (path) => cloudinaryImageUpload(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file),
      },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
