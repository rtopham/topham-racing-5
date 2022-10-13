import {
  validateForm,
  changesMade,
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
  validateBirthDate,
  validateTime
} from '../form-utils/formValidation'

//set initial values of fields based on record passed in from function call
export const initializeFields = (fields, record) =>
  fields.forEach((field) => {
    field.initialValue = record[field.name]
  })

//create an object with all the input values for ease of use

export const getValues = (form) => {
  const values = {}
  form.forEach((input) => {
    values[input.name] = input.value
  })
  return values
}

export const getResetFunction = (form) => {
  const resetForm = () => {
    for (let x = 0; x < form.length; x++) {
      form[x].reset()
    }
  }
  return resetForm
}

export const getFunctions = (form) => {
  const resetForm = () => {
    for (let x = 0; x < form.length; x++) {
      form[x].reset()
    }
  }

  return { resetForm, validateForm, changesMade }
}

export const getValidationStatus = (input, value) => {
  const { validationType, confirmationValue, min, max, length } = input
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
    case 'time':
      isValid = validateTime(value) === 'success'
      isInvalid = validateTime(value) === 'error'
      break

    default:
      isValid = null
      isInvalid = false
  }

  return { isValid, isInvalid }
}
