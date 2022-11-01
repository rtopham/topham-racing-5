const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const StravaProfile = require('../models/stravaProfileModel')
const axios = require('axios')

// @desc    Get Strava Profile for logged in user
// @route   GET /api/strava
// @access  private

const getStravaProfile = asyncHandler(async (req, res) => {
  const stravaProfile = await StravaProfile.findOne({ user: req.user.id })

  res.status(200).json(stravaProfile)
})

// @desc    Get Strava Profile By UserId
// @route   GET /api/strava/by-user/:id
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

// @desc    Update Strava Tokens
// @route   PUT /api/strava/tokens/:id
// @access  public but requires public api key

const updateStravaTokens = asyncHandler(async (req, res) => {
  //Get user using the id in the url
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const stravaProfile = await StravaProfile.findOne({ user: req.params.id })
  const stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID
  const stravaClientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET

  if (stravaProfile) {
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)

    const { strava_token_expires_at, strava_refresh_token } = stravaProfile

    if (strava_token_expires_at < secondsSinceEpoch) {
      //Request new Tokens from Strava
      console.log('Requesting new tokens')

      const newTokens = await axios.post(
        `https://www.strava.com/api/v3/oauth/token?client_id=${stravaClientId}&client_secret=${stravaClientSecret}&grant_type=refresh_token&refresh_token=${strava_refresh_token}`
      )
      const updatedFields = {
        strava_token: newTokens.data.access_token,
        strava_token_expires_at: newTokens.data.expires_at,
        strava_refresh_token: newTokens.data.refresh_token
      }

      const updatedStravaProfile = await StravaProfile.findOneAndUpdate(
        { user: req.params.id },
        { $set: updatedFields },
        { new: true }
      )
      res.status(200).json(updatedStravaProfile)
    } else {
      console.log('Tokens do not need updating')
      res.status(200).json(stravaProfile)
    }
  }
})

module.exports = {
  getStravaProfile,
  getStravaProfileByUser,
  updateStravaProfile,
  updateStravaTokens
}
