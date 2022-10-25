import axios from 'axios'

const API_URL = '/api/users/'

//Register user

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Logout User

const logout = () => localStorage.removeItem('user')

//Update User Profile
const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + 'profile', profileData, config)

  //Update local storage to reflect the changes.

  if (response.data) {
    const updatedUserObject = { ...response.data, token }
    localStorage.setItem('user', JSON.stringify(updatedUserObject))
  }

  return { ...response.data, token }
}

//Add Banner

const addBanner = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await axios.post(API_URL + 'banners', formData, config)

  //Update local storage to reflect the changes.

  if (response.data) {
    const updatedUserObject = { ...response.data, token }
    localStorage.setItem('user', JSON.stringify(updatedUserObject))
  }

  return { ...response.data, token }
}

//Delete Race
const deleteBanner = async (bannerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + 'banners/' + bannerId, config)

  if (response.data) {
    const updatedUserObject = { ...response.data, token }
    localStorage.setItem('user', JSON.stringify(updatedUserObject))
  }

  return { ...response.data, token }
}

const authService = {
  register,
  login,
  logout,
  updateProfile,
  addBanner,
  deleteBanner
}

export default authService
