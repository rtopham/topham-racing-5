import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bannerService from './bannerService'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

const initialState = {
  banners: null
}

//Get Banners for Logged In User

export const getBanners = createAsyncThunk(
  'banners/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bannerService.getBanners(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get Banners by User

export const getBannersByUser = createAsyncThunk(
  'banners/getByUser',
  async (userId, thunkAPI) => {
    try {
      return await bannerService.getBannersByUser(userId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const bannerSlice = createSlice({
  name: 'banners',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getBannersByUser.fulfilled, (state, action) => {
        state.banners = action.payload
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.banners = action.payload
      })
  }
})

export default bannerSlice.reducer
