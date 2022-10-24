import { useState } from 'react'

import { TRASH_ICON, WARNING_ICON, CANCEL_ICON } from '../../../utils/icons'

import useForm from '../../../forms/form-hooks/useForm'

const useConfirmCancel = (props) => {
  const {
    className,
    icon,
    tip,
    titleIcon,
    title,
    confirmationPrompt,
    confirmationText,
    confirmationButtonIcon,
    confirmationButtonText,
    confirmationButtonVariant,
    cancelButtonIcon,
    cancelButtonText,
    cancelButtonVariant,
    confirmationFunction,
    cancelFunction,
    children
  } = props
  const [showModal, setShowModal] = useState(false)

  const modalForm = useForm(
    [
      {
        name: 'confirmationText',
        type: 'text',
        validationtype: 'confirmationText',
        confirmationvalue: confirmationText
      }
    ],
    { confirmationText: '' }
  )

  const handleToggle = () => {
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
    modalForm.reset()
    if (cancelFunction) cancelFunction()
  }

  const handleConfirmation = (e) => {
    e.preventDefault()
    if (confirmationFunction) confirmationFunction()
    setShowModal(false)

    modalForm.reset()
  }

  return {
    className,
    icon: icon || TRASH_ICON,
    tip: tip || 'Delete',
    titleIcon: titleIcon || WARNING_ICON,
    title: title || 'Permanently Delete?',
    confirmationPrompt: confirmationPrompt || 'To confirm deletion',
    confirmationText: confirmationText || 'delete',
    showModal,
    confirmationButtonIcon: confirmationButtonIcon || TRASH_ICON,
    confirmationButtonText: confirmationButtonText || CANCEL_ICON,
    confirmationButtonVariant: confirmationButtonVariant || 'danger',
    cancelButtonIcon: cancelButtonIcon || CANCEL_ICON,
    cancelButtonText: cancelButtonText || 'Cancel',
    cancelButtonVariant: cancelButtonVariant || 'dark',
    setShowModal: handleToggle,
    clickConfirm: handleConfirmation,
    clickCancel: handleCancel,
    ...modalForm,
    children
  }
}

export default useConfirmCancel
