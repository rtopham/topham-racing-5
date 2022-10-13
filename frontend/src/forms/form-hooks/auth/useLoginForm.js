import useInput from '../../input-hooks/useInput'

import { loginFields as fields } from '../../inputs/auth/authInputs'

import {
  initializeFields,
  getValues,
  getFunctions
} from '../../form-utils/formFunctions'

const useLoginForm = (record) => {
  const form = []

  initializeFields(fields, record)

  //push inputs onto form array--requires one push for each field

  form.push(useInput(fields[form.length]))
  form.push(useInput(fields[form.length]))

  return {
    form,
    values: getValues(form),
    ...getFunctions(form)
  }
}

export default useLoginForm
