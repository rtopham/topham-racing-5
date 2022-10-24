const express = require('express')
const router = express.Router()
const {
  getStravaProfile,
  getStravaProfileByUser,
  updateStravaProfile
} = require('../controllers/stravaController')

const { protect } = require('../middleware/authMiddleware')
//const { protectStrava } = require('../middleware/stravaMiddleware')

//Get Strava Profile for the logged in user

router.route('/').get(protect, getStravaProfile)

//Get Strava Profile for a User by UserId

router.route('/by-user/:id').get(getStravaProfileByUser)

//Update Strava Profile with update secret

router.route('/:id').put(updateStravaProfile)

module.exports = router
