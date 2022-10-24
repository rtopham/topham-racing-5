import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bannerService from './bannerService'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

const initialState = {
  banners: null
}

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
    builder.addCase(getBannersByUser.fulfilled, (state, action) => {
      state.banners = action.payload
    })
  }
})

export default bannerSlice.reducer
