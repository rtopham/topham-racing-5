import Button from 'react-bootstrap/Button'
import Icon from './Icon'

import useFormModal from '../../components/modals/modal-hooks/useFormModal'

import FormModal from '../../components/modals/modal-components/FormModal'

const EditRecordButton = (props) => {
  const editRecordModal = useFormModal(props)

  const { className, variant, buttonText, icon, setShowModal } = editRecordModal

  return (
    <>
      <Button className={className} variant={variant} onClick={setShowModal}>
        <Icon icon={icon} /> {buttonText}
      </Button>

      <FormModal {...editRecordModal} />
    </>
  )
}

export default EditRecordButton
