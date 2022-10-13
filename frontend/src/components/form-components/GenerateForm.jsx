import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GenerateForm = ({
  form,
  onSubmit,
  buttonText,
  buttonVariant,
  disabled,
  useLabels
}) => {
  return (
    <>
      <Form onSubmit={onSubmit}>
        {form.map((input, index) => {
          const { reset, ...inputProps } = input
          switch (input.type) {
            default:
              return (
                <Form.Group key={index} className='mb-3 mt-3'>
                  {useLabels && input.label && (
                    <Form.Label>{input.label} </Form.Label>
                  )}
                  <Form.Control {...inputProps} size='sm' />
                </Form.Group>
              )
          }
        })}
        {onSubmit && (
          <div className='d-grid gap-2 '>
            <Button
              type='submit'
              variant={buttonVariant || 'outline-dark'}
              disabled={disabled}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}

export default GenerateForm
