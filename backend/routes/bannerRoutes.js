const express = require('express')
const router = express.Router()
const {
  getBannersByUser,
  getBanners
} = require('../controllers/bannerController')

const { protect } = require('../middleware/authMiddleware')

//Get all banners for the logged in user
//Add Banner for looged in user

router.route('/').get(protect, getBanners)

//Get banners for a user by userId

router.route('/by-user/:id').get(getBannersByUser)

//Get race, update race, delete race by raceId

/* router
  .route('/:id')
  .get(protect, getRace)
  .put(protect, updateRace)
  .delete(protect, deleteRace) */

module.exports = router
