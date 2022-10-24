import axios from 'axios'

const API_URL = '/api/races/'

//Create New Race

const createRace = async (raceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, raceData, config)

  return response.data
}

//Get Races for Logged in User

const getRaces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//Get Race
const getRace = async (raceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + raceId, config)

  return response.data
}

//Get Races by User
const getRacesByUser = async (userId) => {
  const response = await axios.get(API_URL + 'by-user/' + userId)

  return response.data
}

//Update Race
const updateRace = async (raceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + raceData._id, raceData, config)

  return response.data
}

//Delete Race
const deleteRace = async (raceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + raceId, config)

  return response.data
}

const raceService = {
  createRace,
  getRaces,
  getRacesByUser,
  updateRace,
  getRace,
  deleteRace
}

export default raceService
