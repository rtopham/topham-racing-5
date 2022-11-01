const express = require('express')
const router = express.Router()
const {
  getStravaProfile,
  getStravaProfileByUser,
  updateStravaProfile,
  updateStravaTokens
} = require('../controllers/stravaController')

const { protect } = require('../middleware/authMiddleware')
//const { protectStrava } = require('../middleware/stravaMiddleware')

//Get Strava Profile for the logged in user

router.route('/').get(protect, getStravaProfile)

//Get Strava Profile for a User by UserId

router.route('/by-user/:id').get(getStravaProfileByUser)

//Update Strava Profile

router.route('/:id').put(updateStravaProfile)

//Update Strava Tokens

router.route('/tokens/:id').put(updateStravaTokens)

module.exports = router
