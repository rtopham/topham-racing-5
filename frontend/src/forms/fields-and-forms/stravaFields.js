export const strava_athlete_id = {
  name: 'strava_athlete_id',
  type: 'number',
  label: 'Strava Athlete Id',
  validationtype: 'measurement',
  min: 0,
  step: 1
}

export const strava_token = {
  name: 'strava_token',
  type: 'text',
  label: 'Strava Token',
  validationtype: 'inputLength',
  length: 1
}
export const strava_refresh_token = {
  name: 'strava_refresh_token',
  type: 'text',
  label: 'Strava Refresh Token',
  validationtype: 'inputLength',
  length: 1
}

export const strava_token_expires_at = {
  name: 'strava_token_expires_at',
  type: 'number',
  label: 'Strava Token Expiration',
  validationtype: 'measurement',
  min: 0,
  step: 1
}

export const strava_activity_url = {
  name: 'strava_activity_url',
  type: 'text',
  label: 'Strava Activity Url',
  validationtype: 'inputLength',
  length: 1
}

export const strava_rides_url = {
  name: 'strava_rides_url',
  type: 'text',
  label: 'Strava Rides Url',
  validationtype: 'inputLength',
  length: 1
}

export const stravaProfileFields = [
  strava_athlete_id,
  strava_token,
  strava_refresh_token,
  strava_token_expires_at,
  strava_activity_url,
  strava_rides_url
]
