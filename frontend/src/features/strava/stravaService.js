import axios from 'axios'

const API_URL = '/api/strava/'

//Get Strava Profile for Logged in User

const getStravaProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//Get Strava Profile by User
const getStravaProfileByUser = async (userId) => {
  const response = await axios.get(API_URL + 'by-user/' + userId)

  return response.data
}
//Get Strava Data
const getStravaData = async (stravaProfile) => {
  const { strava_athlete_id, strava_token } = stravaProfile

  const config = {
    headers: {
      Authorization: `Bearer ${strava_token}`
    }
  }

  const response = await axios.get(
    `https://www.strava.com/api/v3/athletes/${strava_athlete_id}/stats`,
    config
  )

  return response.data
}

//Update Strava Profile

const updateStravaProfile = async (userId, updatedFields, apiKey) => {
  const config = {
    headers: {
      api_key: apiKey
    }
  }

  const response = await axios.put(API_URL + userId, updatedFields, config)

  return response.data
}

const stravaService = {
  getStravaProfile,
  getStravaProfileByUser,
  updateStravaProfile,
  getStravaData
}

export default stravaService
