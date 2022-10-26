const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  addBanner,
  deleteBanner,
  getBanner
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getCurrentUser)
router.put('/profile', protect, updateProfile)
router.post('/banners', protect, addBanner)
router.delete('/banners/:bannerId', protect, deleteBanner)
router.get('/banners/:key', getBanner)

module.exports = router
