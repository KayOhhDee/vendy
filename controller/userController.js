const jwt = require("jsonwebtoken")
const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDBID");
const { generateRefreshToken } = require("../config/refreshToken");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies

  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in cookies")
  }

  const refreshToken = cookie.refreshToken
  const user = await User.findOne({ refreshToken })

  if (!user) throw new Error("Refresh token does not exist")

  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error || user?.id !== decoded?.id) {
      throw new Error("There is something wrong with refresh token")
    } 

    const accessToken = generateToken(user?._id)

    res.json({ accessToken })
  })
})

// logout
const logout = asyncHandler(async (req, res) => {

})

// Update user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDBId(_id);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Block user
const blockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Unblock user
const unBlockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

    res.json({
      message: "User Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  login,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout
};
