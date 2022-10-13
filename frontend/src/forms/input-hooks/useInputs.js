import { useState } from 'react'

import { getValidationStatus } from '../form-utils/formFunctions'

import { validateForm, changesMade } from '../form-utils/formValidation'

const useInputs = (inputArray) => {
  const initialValues = {}
  inputArray.forEach((input) => {
    initialValues[input.name] = input.initialValue
    //input.value = input.initialValue
  })

  const [formData, setFormData] = useState(initialValues)

  const onChange = (e) => {
    switch (e.target.type) {
      case 'checkbox':
      case 'switch':
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.checked
        }))
        break
      case 'blockpicker':
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.hex
        }))
        break
      default:
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))
    }
  }

  const reset = () => {
    setFormData(initialValues)
  }

  const form = inputArray.map((input) => ({
    ...input,
    value: formData[input.name],
    isValid: getValidationStatus(input, formData[input.name]).isValid,
    isInvalid: getValidationStatus(input, formData[input.name]).isInvalid,
    onChange: onChange,
    reset: reset
  }))

  return { form, values: formData, reset, validateForm, changesMade }
}

export default useInputs
