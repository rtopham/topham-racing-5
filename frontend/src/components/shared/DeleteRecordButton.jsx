import IconButton from './IconButton'

import useConfirmCancel from '../../components/modals/modal-hooks/useConfirmCancel'

import ConfirmCancelModal from '../../components/modals/modal-components/ConfirmCancelModal'

const DeleteRecordButton = (props) => {
  const deleteRecordForm = useConfirmCancel(props)

  const { className, icon, setShowModal, tip } = deleteRecordForm

  return (
    <>
      <IconButton
        className={className}
        icon={icon}
        onClick={setShowModal}
        tip={tip}
      />

      <ConfirmCancelModal {...deleteRecordForm} />
    </>
  )
}

export default DeleteRecordButton
