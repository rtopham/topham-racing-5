import axios from 'axios'

const API_URL = '/api/banners/'

//Get Races for Logged in User

const getBanners = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//Get Banners by User
const getBannersByUser = async (userId) => {
  const response = await axios.get(API_URL + 'by-user/' + userId)

  return response.data
}

const bannerService = {
  getBannersByUser,
  getBanners
}

export default bannerService
