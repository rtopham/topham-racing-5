const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Get Banners By UserId
// @route   GET /api/banners/by-user/:id
// @access  public

const getBannersByUser = asyncHandler(async (req, res) => {
  //Get user using the id in the url
  const user = await User.findById(req.params.id).select('banners')
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200).json(user.banners)
})

module.exports = {
  getBannersByUser
}
