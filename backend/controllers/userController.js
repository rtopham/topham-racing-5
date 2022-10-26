const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} = require('@aws-sdk/client-s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const folder = process.env.AWS_FOLDER_NAME

const s3 = new S3Client({
  region: region
})

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

//@route    POST api/users/banners
//@desc     Add new banner and handle upload
//@access   Private

const addBanner = asyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400)
    throw new Error('No files uploaded')
  }

  const bannerFile = req.files.banner
  let imgUrl = ''

  const saveBanner = async () => {
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 6; i += 1) {
      imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    // Check to See if filename exists
    const existingBanners = await User.find({
      'banners.filename': { $regex: imgUrl }
    })
    if (existingBanners.length > 0) saveBanner()
    else {
      // Upload and save file
      const ext = path.extname(bannerFile.name).toLowerCase()

      const newBanner = {
        filename: imgUrl + ext
      }

      //Upload to AWS S3

      const fileContent = bannerFile.data

      const uploadParams = {
        Bucket: bucketName,
        Key: folder + imgUrl + ext,
        Body: fileContent
      }
      const run = async () => {
        try {
          const data = await s3.send(new PutObjectCommand(uploadParams))
        } catch (err) {
          console.log('Error', err)
        }
      }
      run()

      //Update banner list in user profile
      const user = await User.findOne({ _id: req.user.id })
      if (!user) {
        res.status(400)
        throw new Error('User not found.')
      }

      if (user) {
        user.banners.unshift(newBanner)
        const updatedProfile = await User.findByIdAndUpdate(
          req.user._id,
          user,
          {
            new: true
          }
        )

        res.status(200).json(updatedProfile)
      }

      //Save file to local file system

      /*      const targetPath = path.resolve(
        `../topham-racing-5/frontend/public/banners/${imgUrl}${ext}`
      )

      bannerFile.mv(targetPath, async (error) => {
        if (error) {
          console.error(error)
          res.writeHead(500, {
            'Content-Type': 'application/json'
          })
          res.end(JSON.stringify({ status: 'error', message: error }))
          return
        }

      }) */
    }
  }

  saveBanner()
})

//@route    DELETE api/users/banners/bannerId
//@desc     Delete Banner
//@access   Private

const deleteBanner = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id })

  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  const removeIndex = user.banners
    .map((banner) => banner.id)
    .indexOf(req.params.bannerId)

  const fileName = user.banners[removeIndex].filename

  //Revmove from local filesystem

  /*   fs.unlink(
    path.resolve(`../topham-racing-5/frontend/public/banners/${fileName}`),
    (err) => {
      if (err) throw new Error(err)
    }
  ) */

  //Delete from S3

  const deleteParams = {
    Bucket: bucketName,
    Key: folder + fileName
  }

  const response = await s3.send(new DeleteObjectCommand(deleteParams))

  //Update banner list in user profile

  user.banners.splice(removeIndex, 1)
  await user.save()
  res.status(200).json(user)
})

//@route GET api/users/banners/:key
//@desc   Get page image from S3
//@access Private

const getBanner = asyncHandler(async (req, res) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: folder + req.params.key
  }

  const s3Object = await s3.send(new GetObjectCommand(downloadParams))

  s3Object.Body.pipe(res)
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  addBanner,
  deleteBanner,
  getBanner
}
