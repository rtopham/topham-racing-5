import { useState } from 'react'
import {
  validateEmail,
  validatePassword,
  validateInputLength,
  validateConfirmPassword,
  validatePhone,
  validateWebsite,
  validateConfirmationText,
  validateZipCode,
  validateDate,
  validateHeight,
  validateWeight,
  validateMeasurement,
  validateMeasurementWithNegativeValues,
  validateBirthDate
} from '../form-utils/formValidation'

const useInput = (inputObject) => {
  const {
    name,
    type,
    as,
    rows,
    label,
    placeholder,
    min,
    max,
    step,
    munit,
    poslabel,
    neglabel,
    initialValue,
    options,
    helpmessage,
    errormessage,
    grouplabel,
    inline,
    tip,
    validationType,
    length,
    confirmationValue
  } = inputObject

  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    switch (type) {
      case 'checkbox':
      case 'switch':
        setValue(e.target.checked)
        break
      case 'blockpicker':
        setValue(e.hex)
        break
      default:
        setValue(e.target.value)
    }
  }

  const reset = () => {
    setValue(initialValue)
  }

  let isValid
  let isInvalid

  switch (validationType) {
    case 'inputLength':
      isValid = validateInputLength(value, length) === 'success'
      isInvalid = validateInputLength(value, length) === 'error'
      break
    case 'email':
      isValid = validateEmail(value) === 'success'
      isInvalid = validateEmail(value) === 'error'
      break
    case 'password':
      isValid = validatePassword(value) === 'success'
      isInvalid = validatePassword(value) === 'error'
      break
    case 'confirmPassword':
      isValid = validateConfirmPassword(value, confirmationValue) === 'success'
      isInvalid = validateConfirmPassword(value, confirmationValue) === 'error'
      break
    case 'phone':
      isValid = validatePhone(value) === 'success'
      isInvalid = validatePhone(value) === 'error'
      break
    case 'zipcode':
      isValid = validateZipCode(value) === 'success'
      isInvalid = validateZipCode(value) === 'error'
      break
    case 'date':
      isValid = validateDate(value) === 'success'
      isInvalid = validateDate(value) === 'error'
      break
    case 'height':
      isValid = validateHeight(value) === 'success'
      isInvalid = validateHeight(value) === 'error'
      break
    case 'measurement':
      isValid = validateMeasurement(value, min, max) === 'success'
      isInvalid = validateMeasurement(value, min, max) === 'error'
      break
    case 'measurementneg':
      isValid =
        validateMeasurementWithNegativeValues(value, min, max) === 'success'
      isInvalid =
        validateMeasurementWithNegativeValues(value, min, max) === 'error'
      break
    case 'weight':
      isValid = validateWeight(value) === 'success'
      isInvalid = validateWeight(value) === 'error'
      break
    case 'website':
      isValid = validateWebsite(value, length) === 'success'
      isInvalid = validateWebsite(value, length) === 'error'
      break
    case 'confirmationText':
      isValid = validateConfirmationText(value, confirmationValue) === 'success'
      isInvalid = validateConfirmationText(value, confirmationValue) === 'error'
      break
    case 'birthDate':
      isValid = validateBirthDate(value) === 'success'
      isInvalid = validateBirthDate(value) === 'error'
      break

    default:
      isValid = null
      isInvalid = false
  }

  return {
    name,
    type,
    as,
    rows,
    value,
    label,
    placeholder,
    min,
    max,
    step,
    munit,
    poslabel,
    neglabel,
    options,
    isValid,
    isInvalid,
    helpmessage,
    errormessage,
    grouplabel,
    inline,
    tip,
    onChange: handleChange,
    reset
  }
}

export default useInput
