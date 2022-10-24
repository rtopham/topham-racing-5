import { Form, Row, Col } from 'react-bootstrap'

const DefaultInput = (props) => {
  const { inline, label, inputSize, helpmessage } = props

  return inline ? (
    <>
      <Row className='align-items-center'>
        {label && (
          <Col xs='auto'>
            <Form.Label>{label}</Form.Label>
          </Col>
        )}
        <Col>
          <Form.Group className={helpmessage ? 'mb-1' : 'mb-3'}>
            <Form.Control {...props} size={inputSize || 'sm'} />
          </Form.Group>
        </Col>
      </Row>
      {helpmessage && (
        <Row className='mb-3'>
          <Form.Text muted>{helpmessage}</Form.Text>
        </Row>
      )}
    </>
  ) : (
    <>
      <Form.Group className='mb-3'>
        {label && <Form.Label>{label} </Form.Label>}
        <Form.Control {...props} size={inputSize || 'sm'} />
        {helpmessage && <Form.Text muted>{helpmessage}</Form.Text>}
      </Form.Group>
    </>
  )
}

export default DefaultInput
