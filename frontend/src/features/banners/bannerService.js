import axios from 'axios'

const API_URL = '/api/banners/'

//Get Banners by User
const getBannersByUser = async (userId) => {
  const response = await axios.get(API_URL + 'by-user/' + userId)

  return response.data
}

const bannerService = {
  getBannersByUser
}

export default bannerService
