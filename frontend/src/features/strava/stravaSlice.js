import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stravaService from './stravaService'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

const initialState = {
  stravaProfile: null,
  stravaData: null,
  stravaError: false
}

//Get StravaProfile for Logged in User

export const getStravaProfile = createAsyncThunk(
  'strava/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await stravaService.getStravaProfile(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get StravaProfile By User

export const getStravaProfileByUser = createAsyncThunk(
  'strava/getByUser',
  async (userId, thunkAPI) => {
    try {
      return await stravaService.getStravaProfileByUser(userId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get StravaData with Strava Profile

export const getStravaData = createAsyncThunk(
  'strava/getStravaData',
  async (stravaProfile, thunkAPI) => {
    try {
      return await stravaService.getStravaData(stravaProfile)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Update Strava Profile

export const updateStravaProfile = createAsyncThunk(
  'strava/updateProfile',
  async ({ userId, updatedFields }, thunkAPI) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY
      return await stravaService.updateStravaProfile(
        userId,
        updatedFields,
        apiKey
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Update Strava Tokens

export const updateStravaTokens = createAsyncThunk(
  'strava/updateTokens',
  async (userId, thunkAPI) => {
    try {
      return await stravaService.updateStravaTokens(userId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const stravaSlice = createSlice({
  name: 'strava',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getStravaProfile.pending, (state) => {
        state.stravaProfile = null
      })
      .addCase(getStravaProfile.fulfilled, (state, action) => {
        state.stravaProfile = action.payload
      })
      .addCase(getStravaProfileByUser.pending, (state) => {
        state.stravaProfile = null
      })
      .addCase(getStravaProfileByUser.fulfilled, (state, action) => {
        state.stravaProfile = action.payload
      })
      .addCase(getStravaData.fulfilled, (state, action) => {
        state.stravaData = action.payload
      })
      .addCase(getStravaData.rejected, (state, action) => {
        state.stravaError = true
      })
      .addCase(updateStravaProfile.pending, (state) => {
        state.stravaProfile = null
      })
      .addCase(updateStravaProfile.fulfilled, (state, action) => {
        state.stravaProfile = action.payload
      })
      .addCase(updateStravaTokens.fulfilled, (state, action) => {
        state.stravaProfile = action.payload
      })
  }
})

export default stravaSlice.reducer
