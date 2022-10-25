const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const fileupload = require('express-fileupload')

const PORT = process.env.PORT || 5000

//Connect to database
connectDB()

const app = express()

// Provide parsing for file uploads
app.use(fileupload())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'This is a basic back-end server' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/races', require('./routes/raceRoutes'))
app.use('/api/strava', require('./routes/stravaRoutes'))
app.use('/api/banners', require('./routes/bannerRoutes'))

//ErrorHandler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
