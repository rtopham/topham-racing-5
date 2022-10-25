import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

//Get User from localstorage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false
}

//Register user

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

//Logout user

export const logout = createAction('auth/logout', async () => {
  await authService.logout()
  return {}
})

//Update User Profile

export const updateProfile = createAsyncThunk(
  'auth/profile',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateProfile(profileData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Add New Banner
export const addBanner = createAsyncThunk(
  'auth/addBanner',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.addBanner(formData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Delete Banner
export const deleteBanner = createAsyncThunk(
  'auth/deleteBanner',
  async (bannerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteBanner(bannerId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => (state.user = null)
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(addBanner.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
  }
})

export default authSlice.reducer
