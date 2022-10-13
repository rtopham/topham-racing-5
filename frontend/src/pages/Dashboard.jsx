import { Link } from 'react-router-dom'
import Icon from '../components/shared/Icon'
import { BIKE_ICON } from '../utils/icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {
  return (
    <Container style={{ width: '500px' }}>
      <Link to='/add-race' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2'>
          <Button variant='outline-dark'>
            <Icon icon={BIKE_ICON} /> Add Race
          </Button>
        </div>
      </Link>
    </Container>
  )
}

export default Dashboard
