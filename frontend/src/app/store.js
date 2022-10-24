import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import raceReducer from '../features/races/raceSlice'
import stravaReducer from '../features/strava/stravaSlice'
import bannerReducer from '../features/banners/bannerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    races: raceReducer,
    strava: stravaReducer,
    banners: bannerReducer
  }
})
