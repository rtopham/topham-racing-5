const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  //Find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Login a user
// @route   /api/users
// @access  public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //Check User and Passwords Match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      banners: user.banners,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get Current User
// @route   /api/users/me
// @access  private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// @desc    Update Profile of Logged In User
// @route   /api/users/profile
// @access  private

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  //Find if user already exists
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  if (password) {
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
  }
  if (user) {
    const updatedProfile = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json(updatedProfile)
  }
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile
}
