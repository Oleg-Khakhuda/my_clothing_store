import React from 'react'
import s from './ModalConfirm.module.scss'

export const ModalConfirm = ({ isModalConfirmOpen, closeConfirmModal, handleConfirm, message }) => {
  if (!isModalConfirmOpen) return null

  return (
    <div className={s.modalContent}>
      <p className={s.question}>{message}</p>
      <ul className={s.btnList}>
        <li className={s.btnItem}>
          <button onClick={handleConfirm}>Так</button>
        </li>
        <li className={s.btnItem}>
          <button onClick={closeConfirmModal}>Відмінити</button>
        </li>
      </ul>
    </div>
  )
}
