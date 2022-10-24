const express = require('express')
const router = express.Router()
const { getBannersByUser } = require('../controllers/bannerController')

//const { protect } = require('../middleware/authMiddleware')

//Get banners for a user by userId

router.route('/by-user/:id').get(getBannersByUser)

//Get race, update race, delete race by raceId

/* router
  .route('/:id')
  .get(protect, getRace)
  .put(protect, updateRace)
  .delete(protect, deleteRace) */

module.exports = router
