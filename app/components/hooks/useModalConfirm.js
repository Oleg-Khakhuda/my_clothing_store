import { useState } from 'react'

export const useModalConfirm = () => {
  const [onConfirm, setOnConfirm] = useState(null)
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)

  const openConfirmModal = confirmCallback => {
    setIsModalConfirmOpen(true)
    setOnConfirm(() => confirmCallback)
  }

  const closeConfirmModal = () => {
    setIsModalConfirmOpen(false)
    setOnConfirm(null)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    closeConfirmModal()
  }

  return {
    isModalConfirmOpen,
    openConfirmModal,
    closeConfirmModal,
    handleConfirm,
  }
}
