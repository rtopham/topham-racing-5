import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import raceService from './raceService'
import { extractErrorMessage } from '../../utils/extractErrorMessage'

const initialState = {
  races: null,
  filtered: null,
  race: null
}

//Create New Race

export const createRace = createAsyncThunk(
  'races/create',
  async (raceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await raceService.createRace(raceData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get Races for Logged In User

export const getRaces = createAsyncThunk(
  'races/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await raceService.getRaces(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get Races by User

export const getRacesByUser = createAsyncThunk(
  'races/getByUser',
  async (userId, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await raceService.getRacesByUser(userId)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get Race

export const getRace = createAsyncThunk(
  'races/get',
  async (raceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await raceService.getRace(raceId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Update Race

export const updateRace = createAsyncThunk(
  'races/updateRace',
  async (raceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await raceService.updateRace(raceData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Delete Race

export const deleteRace = createAsyncThunk(
  'races/deleteRace',
  async (raceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await raceService.deleteRace(raceId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Filter Races
export const filterRaces = createAction('races/filter', (filter) => {
  return { payload: filter }
})

export const raceSlice = createSlice({
  name: 'races',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getRaces.pending, (state) => {
        state.race = null
      })
      .addCase(getRaces.fulfilled, (state, action) => {
        state.races = action.payload
      })
      .addCase(getRacesByUser.fulfilled, (state, action) => {
        state.races = action.payload
        state.filtered = action.payload
      })
      .addCase(updateRace.fulfilled, (state, action) => {
        state.races = state.races.map((race) =>
          race._id === action.payload._id ? action.payload : race
        )
      })
      .addCase(getRace.fulfilled, (state, action) => {
        state.race = action.payload
      })
      .addCase(deleteRace.fulfilled, (state, action) => {
        state.races = state.races.filter(
          (race) => race._id !== action.payload._id
        )
      })
      .addCase(filterRaces, (state, action) => {
        state.filtered = state.races.filter((race) => {
          switch (action.payload) {
            case 'current':
              return (
                new Date(race.race_date).getFullYear() ===
                new Date().getFullYear()
              )
            case 'lastYear':
              return (
                new Date(race.race_date).getFullYear() ===
                new Date().getFullYear() - 1
              )
            case 'ICUP':
              return race.series.match('Intermountain Cup')
            case 'Mid-Week':
              return race.series.match('Mid-Week')
            case 'USAC':
              return race.series.match('USAC')
            case 'Other':
              return (
                race.series !== 'Intermountain Cup' &&
                race.series !== 'Mid-Week' &&
                race.series !== 'USAC'
              )
            case 'Podiums':
              return race.rank <= 3 && race.rank !== 0
            case 'Wins':
              return race.rank === 1

            default:
              return race
          }
        })
      })
  }
})

export const { reset } = raceSlice.actions

export default raceSlice.reducer
