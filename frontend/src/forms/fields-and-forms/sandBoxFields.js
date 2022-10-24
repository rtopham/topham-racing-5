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
  label: '',
  placeholder: 'Password',
  validationtype: 'password',

  errormessage: '(passwords do not match)',
  helpmessage:
    'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number. Special characters are allowed.'
}

export const confirmPassword = {
  name: 'confirmPassword',
  type: 'password',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  validationtype: 'password',
  errormessage: '(passwords do not match)'
}

export const selection = {
  name: 'selection',
  type: 'select',

  label: 'Selection Field',
  options: ['Option 1', 'Option 2', 'Option 3']
}

export const radioButtons = {
  name: 'radioButtons',

  type: 'radio',
  label: 'Gender',
  options: ['Male', 'Female', 'Non-Binary']
}

export const mySwitch = {
  name: 'mySwitch',
  type: 'switch',
  label: 'Share Data?',
  heading: 'My Switch'
}

export const checkBox = {
  name: 'checkBox',
  type: 'checkbox',
  label: 'Check This'
}
export const checkBox2 = {
  name: 'checkBox2',
  type: 'checkbox',
  label: 'Check That'
}

export const numberInput = {
  name: 'numberInput',
  type: 'number',
  label: 'Number Input'
}

export const dateInput = {
  name: 'dateInput',
  type: 'date',
  label: 'Date Input'
}

export const colorInput = {
  name: 'colorInput',
  type: 'color',
  label: 'Color Input'
}

export const textBox = {
  name: 'textBox',
  type: 'textarea',
  as: 'textarea',
  label: 'Text Area Input',
  rows: '4',
  cols: '50',
  spellCheck: 'true'
}
export const time = {
  name: 'time',
  type: 'time',
  label: 'Time Input'
}

export const loginFields = [email, password]

export const registerFields = [name, email, password, confirmPassword]

export const profileFields = [name, email]

//export const sandBoxFields = [name, email, password, confirmPassword, selection]
export const sandBoxFields = [
  selection,
  radioButtons,
  mySwitch,
  checkBox,
  checkBox2,
  numberInput,
  dateInput,
  colorInput,
  textBox,
  time
]
