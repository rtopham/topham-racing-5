const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Get Banners for logged in user
// @route   GET /api/banners
// @access  private

const getBanners = asyncHandler(async (req, res) => {
  const banners = await User.findById(req.user.id).select('banners')

  res.status(200).json(banners)
})

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

//@route    POST api/users/banners/userId
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
      // Upload and save file to file system.
      const ext = path.extname(bannerFile.name).toLowerCase()
      //const targetPath = path.resolve(`uploads//banners/${imgUrl}${ext}`)
      //const targetPath = path.resolve(`/banners/${imgUrl}${ext}`)
      const targetPath = path.resolve(
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
        try {
          const newBanner = {
            filename: imgUrl + ext
          }
          const user = await User.findOne({ _id: req.user.id })
          user.banners.unshift(newBanner)
          await user.save()
          res.status(200).json(user)
        } catch (err) {
          console.error(err.message)
          res.status(500).send('Server Error.')
        }

        //return res.status(200)
      })
    }
  }

  saveBanner()
})

module.exports = {
  getBannersByUser,
  getBanners,
  addBanner
}
