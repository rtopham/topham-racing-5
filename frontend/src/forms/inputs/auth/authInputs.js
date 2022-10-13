export const name = {
  name: 'name',
  type: 'text',
  label: 'Name',
  validationType: 'inputLength',
  length: 1
}

export const email = {
  name: 'email',
  type: 'email',
  label: 'Email Address',
  placeholder: 'Email',

  validationType: 'email'
}

export const password = {
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Password',
  validationType: 'password',

  errormessage: '(passwords do not match)',
  helpmessage:
    'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number. Special characters are allowed.'
}

export const confirmPassword = {
  name: 'confirmPassword',
  type: 'password',
  label: 'Confirm Password',
  validationType: 'password',
  errormessage: '(passwords do not match)'
}

export const loginFields = [email, password]
