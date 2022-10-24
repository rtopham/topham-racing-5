const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const StravaProfile = require('../models/stravaProfileModel')

// @desc    Get Strava Profile for logged in user
// @route   GET /api/strava
// @access  private

const getStravaProfile = asyncHandler(async (req, res) => {
  const races = await StravaProfile.findOne({ user: req.user.id })

  res.status(200).json(stravaProfile)
})

// @desc    Get Races By UserId
// @route   GET /api/races/by-user/:id
// @access  public

const getStravaProfileByUser = asyncHandler(async (req, res) => {
  //Get user using the id in the url
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const stravaProfile = await StravaProfile.findOne({ user: req.params.id })

  res.status(200).json(stravaProfile)
})

// @desc    Update Strava Profile
// @route   PUT /api/strava
// @access  public but requires public api key

const updateStravaProfile = asyncHandler(async (req, res) => {
  if (req.headers.api_key !== process.env.API_KEY) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const stuff = {
    validApi: req.headers.api_key === process.env.API_KEY,
    userId: req.params.id,
    access_token: req.body.access_token,
    refresh_token: req.body.refresh_token
  }
  //res.status(200).json(req.body)

  const updatedStravaProfile = await StravaProfile.findOneAndUpdate(
    { user: req.params.id },
    { $set: req.body },
    { new: true }
  )

  res.status(200).json(updatedStravaProfile)
})

module.exports = {
  getStravaProfile,
  getStravaProfileByUser,
  updateStravaProfile
}
