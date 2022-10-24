import { useState } from 'react'
import { EDIT_ICON, SAVE_ICON, CANCEL_ICON } from '../../../utils/icons'

const useFormModal = (props) => {
  const {
    icon,
    tip,
    titleIcon,
    title,
    confirmationButtonIcon,
    confirmationButtonText,
    confirmationButtonVariant,
    cancelButtonIcon,
    cancelButtonText,
    cancelButtonVariant,
    editFunction,
    cancelFunction
  } = props
  const [showModal, setShowModal] = useState(false)

  const handleToggle = () => {
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)

    if (cancelFunction) cancelFunction()
  }

  const handleConfirmation = (e) => {
    e.preventDefault()
    if (editFunction) editFunction()
    setShowModal(false)
  }

  return {
    ...props,
    icon: icon || EDIT_ICON,
    tip: tip || 'Edit',
    titleIcon: titleIcon || EDIT_ICON,
    title: title || 'Edit Record',
    showModal,
    confirmationButtonIcon: confirmationButtonIcon || SAVE_ICON,
    confirmationButtonText: confirmationButtonText || 'Save',
    confirmationButtonVariant: confirmationButtonVariant || 'danger',
    cancelButtonIcon: cancelButtonIcon || CANCEL_ICON,
    cancelButtonText: cancelButtonText || 'Cancel',
    cancelButtonVariant: cancelButtonVariant || 'dark',
    setShowModal: handleToggle,
    clickConfirm: handleConfirmation,
    clickCancel: handleCancel
  }
}

export default useFormModal
