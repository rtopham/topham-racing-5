const StravaWidgets = ({ stravaProfile }) => {
  return (
    <div>
      <iframe
        title='latestRides'
        height='454'
        // width='930'
        width='100%'
        frameBorder='0'
        allowtransparency='true'
        scrolling='no'
        src={stravaProfile.strava_rides_url}
      ></iframe>
      <iframe
        title='latestActivity'
        height='160'
        //width='930'
        width='100%'
        frameBorder='0'
        allowtransparency='true'
        scrolling='no'
        src={stravaProfile.strava_activity_url}
      ></iframe>
    </div>
  )
}

export default StravaWidgets
