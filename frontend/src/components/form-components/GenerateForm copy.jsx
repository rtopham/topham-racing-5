import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GenerateForm = ({
  form,
  onSubmit,
  buttonText,
  buttonVariant,
  disabled
}) => {
  return (
    <>
      <Form onSubmit={onSubmit}>
        {form.map((input, index) => {
          const {
            size,
            as,
            rows,
            spellCheck,
            value,
            type,
            isValid,
            isInvalid,
            onChange,
            placeholder,
            min,
            max,
            step,
            inline
          } = input
          switch (input.type) {
            default:
              return (
                <Form.Group key={index} className='mb-3 mt-3'>
                  <Form.Control
                    size={size || 'sm'}
                    as={as}
                    rows={rows}
                    spellCheck={spellCheck}
                    value={value}
                    type={type}
                    isValid={isValid}
                    isInvalid={isInvalid}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min || 0}
                    max={max}
                    step={step}
                    inline={inline}
                  />
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
