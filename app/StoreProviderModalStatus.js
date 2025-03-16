'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { clearMessage } from './redux/features/products/thunks'
import { ModalStatus } from './components/utils/ModalStatus/ModalStatus'

const ModalContext = createContext()

// Хук для керування станом модального вікна
export const useModalStatus = () => useContext(ModalContext)

export const StoreProviderModalStatus = ({ children }) => {
  const message = useAppSelector(state => state.products.message)
  const error = useAppSelector(state => state.products.error)
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (message || error) {
      setIsOpen(true)
      const timer = setTimeout(() => {
        setIsOpen(false)
        dispatch(clearMessage())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [message, dispatch, error])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    dispatch(clearMessage())
  }, [dispatch])

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
  }, [handleClose, isOpen])

  return (
    <ModalContext.Provider value={{ isOpen, handleClose, message, error }}>
      {children}
      <ModalStatus />
    </ModalContext.Provider>
  )
}
