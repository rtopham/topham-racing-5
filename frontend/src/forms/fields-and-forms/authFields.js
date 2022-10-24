export const name = {
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Name',
  validationtype: 'inputLength',
  length: 1
}

export const email = {
  name: 'email',
  type: 'email',
  label: 'Email Address',
  placeholder: 'Email',

  validationtype: 'email'
}

export const password = {
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Password',
  validationtype: 'password',

  errormessage: '(passwords do not match)'
}

export const passwordHelpMessage = {
  name: 'passwordHelpMessage',
  as: 'span',
  type: 'formtext',
  text: 'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number. Special characters are allowed.'
}

export const confirmPassword = {
  name: 'confirmPassword',
  type: 'password',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  validationtype: 'password',
  errormessage: '(passwords do not match)'
}

export const loginFields = [email, password]

export const registerFields = [name, email, password, confirmPassword]

export const profileFields = [name, email]

export const editPasswordFields = [
  password,
  passwordHelpMessage,
  confirmPassword
]
