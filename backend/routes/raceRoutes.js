const express = require('express')
const router = express.Router()
const {
  getRaces,
  getRacesByUser,
  getRace,
  createRace,
  updateRace,
  deleteRace
} = require('../controllers/raceController')

const { protect } = require('../middleware/authMiddleware')

//Get all races for the logged in user
//Create Race for the logged in user

router.route('/').get(protect, getRaces).post(protect, createRace)

//Get all races for a user by userId

router.route('/by-user/:id').get(getRacesByUser)

//Get race, update race, delete race by raceId

router
  .route('/:id')
  .get(protect, getRace)
  .put(protect, updateRace)
  .delete(protect, deleteRace)

module.exports = router
