'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { clearMessage } from './redux/features/products/thunks'
import { ModalStatus } from './components/utils/ModalStatus/ModalStatus'

const ModalContext = createContext()

// Хук для керування станом модального вікна
export const useModalStatus = () => useContext(ModalContext)

export const StoreProviderModalStatus = ({ children }) => {
  // const message = useAppSelector(state => state.products.message)
  // const error = useAppSelector(state => state.products.error)
  const productMessage = useAppSelector(state => state.products.message)
  const productError = useAppSelector(state => state.products.error)
  const categoryMessage = useAppSelector(state => state.category.message)
  const categoryError = useAppSelector(state => state.category.error)
  const mainCategoryMessage = useAppSelector(state => state.mainCategory.message)
  const mainCategoryError = useAppSelector(state => state.mainCategory.error)

  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // useEffect(() => {
  //   if (message || error) {
  //     setIsOpen(true)
  //     const timer = setTimeout(() => {
  //       setIsOpen(false)
  //       // dispatch(clearMessage())
  //     }, 3000)

  //     return () => clearTimeout(timer)
  //   }
  // }, [dispatch, message, error])

  useEffect(() => {
    if (
      productMessage ||
      productError ||
      categoryMessage ||
      categoryError ||
      mainCategoryMessage ||
      mainCategoryError
    ) {
      setMessage(productMessage || categoryMessage || mainCategoryMessage)
      setError(productError || categoryError || mainCategoryError)

      setIsOpen(true)
      const timer = setTimeout(() => {
        setIsOpen(false)
        setMessage('')
        setError('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [dispatch, productMessage, productError, categoryMessage, categoryError, mainCategoryMessage, mainCategoryError])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setMessage('')
    setError('')
  }, [])

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
