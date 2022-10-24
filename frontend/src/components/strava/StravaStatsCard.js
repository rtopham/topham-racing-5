import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

import PropTypes from 'prop-types'

const StravaStatsCard = ({ title, stats }) => {
  return (
    <Card className='mb-3'>
      <Card.Header as='h6'>
        {' '}
        <img
          alt=''
          className='stravaLogo'
          src='/images/stravaiconSM.gif'
        />{' '}
        <span>{title}</span>
      </Card.Header>
      <Card.Body>
        <ListGroup variant='flush'>
          <ListGroupItem>Rides: {stats.totalRides} </ListGroupItem>
          <ListGroupItem>
            Distance: {stats.totalDistance + ' miles'}{' '}
          </ListGroupItem>
          <ListGroupItem>Time: {stats.totalTime + ' hours'} </ListGroupItem>
          <ListGroupItem>
            Moving Time: {stats.totalMovingTime + ' hours'}{' '}
          </ListGroupItem>
          <ListGroupItem>
            Elevation: {stats.totalElevation + ' feet'}{' '}
          </ListGroupItem>
          <ListGroupItem>
            Everest Equivalents: {stats.totalEverests}{' '}
          </ListGroupItem>
          <ListGroupItem>Earth Laps: {stats.totalEarthLaps} </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

StravaStatsCard.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.object.isRequired
}

export default StravaStatsCard
