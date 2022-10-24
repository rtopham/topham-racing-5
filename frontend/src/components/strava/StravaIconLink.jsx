import { Image } from 'react-bootstrap'
import axios from 'axios'

const StrravaIcon = ({ race, stravaProfile, checkTokens }) => {
  const { race_date } = race

  const theDate = new Date(race_date)
  const theEpoch = theDate.getTime() / 1000.0

  const onClick = async (e) => {
    e.preventDefault()

    checkTokens()

    const config = {
      headers: {
        Authorization: `Bearer ${stravaProfile.strava_token}`
      }
    }

    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?after=${theEpoch}&per_page=5`,
      config
    )

    const stravaRaces = res.data
    let raceId = 0
    let sufferScore = 0
    let loopCount = stravaRaces.length
    if (stravaRaces.length > 3) loopCount = 3

    for (var i = 0; i < loopCount; i++) {
      if (stravaRaces[i].suffer_score > sufferScore) {
        sufferScore = stravaRaces[i].suffer_score
        raceId = stravaRaces[i].id
      }
    }
    window.open(`https://www.strava.com/activities/${raceId}`)
  }

  if (new Date(race_date) > new Date('06-08-2010'))
    return (
      <a href={'#' + race_date} onClick={onClick}>
        <Image
          className='float-end'
          style={{ height: '25px', width: '25px' }}
          src='/images/stravaiconSM.gif'
          alt='Strava Link'
        />
      </a>
    )
}

export default StrravaIcon
