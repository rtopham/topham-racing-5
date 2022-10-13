import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Footer = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      bg='dark'
      fixed='bottom'
    >
      <Container style={{ width: '237px' }}>
        <Navbar.Text>Race a bike. Improve your life.</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer
