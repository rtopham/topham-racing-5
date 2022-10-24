const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Race = require('../models/raceModel')

// @desc    Get Races for logged in user
// @route   GET /api/races
// @access  private

const getRaces = asyncHandler(async (req, res) => {
  const races = await Race.find({ user: req.user.id }).sort({ race_date: -1 })

  res.status(200).json(races)
})

// @desc    Get Races By UserId
// @route   GET /api/races/by-user/:id
// @access  public

const getRacesByUser = asyncHandler(async (req, res) => {
  //Get user using the id in the url
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const races = await Race.find({ postedBy: req.params.id }).sort({
    race_date: -1
  })

  res.status(200).json(races)
})

// @desc    Get Race
// @route   GET /api/races/:id
// @access  private

const getRace = asyncHandler(async (req, res) => {
  const race = await Race.findById(req.params.id)

  if (!race) {
    res.status(404)
    throw new Error('Race not found')
  }

  if (race.postedBy.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(race)
})

// @desc    Create Race
// @route   POST /api/races
// @access  private

const createRace = asyncHandler(async (req, res) => {
  const { race_name, series, race_date, location, rank, category, time } =
    req.body
  if (
    !race_name ||
    !series ||
    !race_date ||
    !location ||
    !rank ||
    !category ||
    !time
  ) {
    res.status(400)
    throw new Error('Please provide full face details')
  }
  const race = await Race.create({
    race_name,
    series,
    race_date,
    location,
    rank,
    category,
    time,
    postedBy: req.user.id
  })

  res.status(201).json(race)
})

// @desc    Update Race
// @route   PUT /api/races/:id
// @access  private

const updateRace = asyncHandler(async (req, res) => {
  const race = await Race.findById(req.params.id)

  if (!race) {
    res.status(404)
    throw new Error('Race not found')
  }

  if (race.postedBy.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedRace = await Race.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedRace)
})

// @desc    Delete Race
// @route   POST /api/races/:id
// @access  private

const deleteRace = asyncHandler(async (req, res) => {
  const race = await Race.findById(req.params.id)

  if (!race) {
    res.status(404)
    throw new Error('Race not found')
  }

  if (race.postedBy.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const deletedRace = await race.remove()

  res.status(200).json(deletedRace)
})

module.exports = {
  getRaces,
  getRacesByUser,
  getRace,
  createRace,
  updateRace,
  deleteRace
}
