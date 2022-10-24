import IconButton from './IconButton'

import useFormModal from '../../components/modals/modal-hooks/useFormModal'

import FormModal from '../../components/modals/modal-components/FormModal'

const EditRecordIcon = (props) => {
  const editRecordModal = useFormModal(props)

  const { className, icon, setShowModal, tip } = editRecordModal

  return (
    <>
      <IconButton
        className={className}
        icon={icon}
        onClick={setShowModal}
        tip={tip}
      />

      <FormModal {...editRecordModal} />
    </>
  )
}

export default EditRecordIcon
