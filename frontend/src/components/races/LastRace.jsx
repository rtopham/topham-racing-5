import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col } from 'react-bootstrap'
import SeriesIcon from './SeriesIcon'

const LastRace = ({ race }) => {
  const { race_name, race_date, series, rank, category, time } = race

  return (
    <Card body className='mb-3'>
      <Row>
        <Col>
          <ListGroup variant='flush'>
            {' '}
            <ListGroup.Item>
              <h6>Last Race: {new Date(race_date).toLocaleDateString()}</h6>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                <SeriesIcon series={series} /> {race_name}
              </h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup variant='flush'>
            {' '}
            <ListGroup.Item>Rank: {rank}</ListGroup.Item>
            <ListGroup.Item>Time: {time}</ListGroup.Item>
            <ListGroup.Item>Category: {category}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  )
}

export default LastRace
