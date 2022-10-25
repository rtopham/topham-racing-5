const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  addBanner
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getCurrentUser)
router.put('/profile', protect, updateProfile)
router.post('/banners', protect, addBanner)

module.exports = router
