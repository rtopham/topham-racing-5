import { useEffect } from 'react'
import Spinner from '../shared/Spinner'
import { getStravaData } from '../../features/strava/stravaSlice'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import StravaStatsCard from './StravaStatsCard'
import StravaError from './StravaError'

const StravaStats = ({ stravaProfile, checkTokens }) => {
  const { stravaData, stravaError } = useSelector((state) => state.strava)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStravaData(stravaProfile)).unwrap().catch(toast.error)
  }, [dispatch, stravaProfile])

  if (stravaError) return <StravaError />

  if (!stravaData) return <Spinner />

  let stravaStats = { recentStats: {}, ytdStats: {}, allTimeStats: {} }

  const getTimeString = (seconds) => {
    let hours = seconds / 3600
    return hours.toLocaleString('en', { maximumFractionDigits: 1 })
  }

  const getMilesString = (meters) => {
    let miles = meters / 1609.34
    return miles.toLocaleString('en', { maximumFractionDigits: 1 })
  }

  const getElevationString = (meters) => {
    let feet = meters * 3.28084
    return feet.toLocaleString('en', { maximumFractionDigits: 0 })
  }

  const getEverestsString = (meters) => {
    let everests = meters / 8848.9
    return everests.toLocaleString('en', { maximumFractionDigits: 1 })
  }

  const getEarthLapsString = (meters) => {
    let earthLaps = meters / 40075000
    return earthLaps.toLocaleString('en', { maximumFractionDigits: 3 })
  }

  stravaStats.recentStats.totalRides =
    stravaData.recent_ride_totals.count.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  stravaStats.recentStats.totalDistance = getMilesString(
    stravaData.recent_ride_totals.distance
  )
  stravaStats.recentStats.totalTime = getTimeString(
    stravaData.recent_ride_totals.elapsed_time
  )
  stravaStats.recentStats.totalMovingTime = getTimeString(
    stravaData.recent_ride_totals.moving_time
  )
  stravaStats.recentStats.totalElevation = getElevationString(
    stravaData.recent_ride_totals.elevation_gain
  )
  stravaStats.recentStats.totalEverests = getEverestsString(
    stravaData.recent_ride_totals.elevation_gain
  )
  stravaStats.recentStats.totalEarthLaps = getEarthLapsString(
    stravaData.recent_ride_totals.distance
  )

  stravaStats.ytdStats.totalRides =
    stravaData.ytd_ride_totals.count.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  stravaStats.ytdStats.totalDistance = getMilesString(
    stravaData.ytd_ride_totals.distance
  )
  stravaStats.ytdStats.totalTime = getTimeString(
    stravaData.ytd_ride_totals.elapsed_time
  )
  stravaStats.ytdStats.totalMovingTime = getTimeString(
    stravaData.ytd_ride_totals.moving_time
  )
  stravaStats.ytdStats.totalElevation = getElevationString(
    stravaData.ytd_ride_totals.elevation_gain
  )
  stravaStats.ytdStats.totalEverests = getEverestsString(
    stravaData.ytd_ride_totals.elevation_gain
  )
  stravaStats.ytdStats.totalEarthLaps = getEarthLapsString(
    stravaData.ytd_ride_totals.distance
  )
  stravaStats.allTimeStats.totalRides =
    stravaData.all_ride_totals.count.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  stravaStats.allTimeStats.totalDistance = getMilesString(
    stravaData.all_ride_totals.distance
  )
  stravaStats.allTimeStats.totalTime = getTimeString(
    stravaData.all_ride_totals.elapsed_time
  )
  stravaStats.allTimeStats.totalMovingTime = getTimeString(
    stravaData.all_ride_totals.moving_time
  )
  stravaStats.allTimeStats.totalElevation = getElevationString(
    stravaData.all_ride_totals.elevation_gain
  )
  stravaStats.allTimeStats.totalEverests = getEverestsString(
    stravaData.all_ride_totals.elevation_gain
  )
  stravaStats.allTimeStats.totalEarthLaps = getEarthLapsString(
    stravaData.all_ride_totals.distance
  )

  return (
    <>
      <StravaStatsCard
        title='Recent Stats (last 28 days)'
        stats={stravaStats.recentStats}
      />
      <StravaStatsCard
        title='Year-To-Date Stats'
        stats={stravaStats.ytdStats}
      />
      <StravaStatsCard
        title='All-Time Stats (since 2012)'
        stats={stravaStats.allTimeStats}
      />{' '}
    </>
  )
}

export default StravaStats
