import { Link, useNavigate } from 'react-router-dom'
import { BIKE_ICON, CYCLIST_ICON, SIGN_OUT_ICON } from '../../utils/icons'
import Icon from '../shared/Icon'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const authLinks = (
    <>
      {/* <Navbar.Text>{user && 'Hello, ' + user.name} </Navbar.Text> */}
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <div>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to='/quickfit/dashboard'>
                <Icon icon={CYCLIST_ICON} /> Dashboard
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to='/login' onClick={onLogout}>
                <Icon icon={SIGN_OUT_ICON} /> Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>{' '}
      </div>
    </>
  )

  const guestLinks = (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to='/register'>
            Register
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to='/login'>
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )

  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' bg='dark' fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <Icon icon={BIKE_ICON} /> Topham Racing
        </Navbar.Brand>
        {user ? authLinks : guestLinks}
      </Container>
    </Navbar>
  )
}

export default Header
