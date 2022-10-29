import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  getStravaProfileByUser,
  updateStravaProfile
} from '../../../features/strava/stravaSlice'

const useStravaProfile = (userId) => {
  const { stravaProfile } = useSelector((state) => state.strava)
  const dispatch = useDispatch()

  useEffect(() => {
    //get strava profile
    dispatch(getStravaProfileByUser(userId))
  }, [dispatch, userId])

  const checkTokens = useCallback(async () => {
    //Check to see if strava access token has expired and if so refresh and update strava profile with new tokens.
    const stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID
    const stravaClientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET

    if (stravaProfile) {
      const now = new Date()
      const secondsSinceEpoch = Math.round(now.getTime() / 1000)

      const { strava_token_expires_at, strava_refresh_token } = stravaProfile

      if (strava_token_expires_at < secondsSinceEpoch) {
        const newTokens = await axios.post(
          `https://www.strava.com/api/v3/oauth/token?client_id=${stravaClientId}&client_secret=${stravaClientSecret}&grant_type=refresh_token&refresh_token=${strava_refresh_token}`
        )

        const updatedFields = {
          strava_token: newTokens.data.access_token,
          strava_token_expires_at: newTokens.data.expires_at,
          strava_refresh_token: newTokens.data.refresh_token
        }
        dispatch(updateStravaProfile({ userId, updatedFields }))
      }
    }
  }, [dispatch, stravaProfile, userId])

  useEffect(() => {
    checkTokens()
  }, [dispatch, stravaProfile, userId, checkTokens])

  return [stravaProfile, checkTokens]
}

export default useStravaProfile
