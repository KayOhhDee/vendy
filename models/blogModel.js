const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  numViews: {
    type: Number,
    default: 0,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isDisliked: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  image: {
    type: String,
    default: "https://img.freepik.com/free-photo/blog-notes-concept-with-wooden-blocks-pen-black-notebook-top-view_176474-10347.jpg?w=2000&t=st=1700827549~exp=1700828149~hmac=b5716c5cc8a523be4b86d853694db3c51f6042fe6551eef834fbdc825bd88f93"
  },
  author: {
    type: String,
    default: "Admin"
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true
});

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
