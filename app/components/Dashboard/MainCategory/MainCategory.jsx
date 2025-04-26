'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Image from 'next/image'
import Loader from '../../Loader/Loader'
import { ModalConfirm } from '../../utils/ModalConfirmation/ModalConfirm'
import { useModalConfirm } from '../../hooks/useModalConfirm'
import { ModalMainCategory } from '../../utils/ModalMainCategory/ModalMainCategory'
import { removeMainCategoryThunk } from '../../../redux/features/mainCategories/thunks'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { IoAddCircleOutline } from 'react-icons/io5'
import { RxUpdate } from 'react-icons/rx'
import s from './MainCategory.module.scss'

export const MainCategory = () => {
  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const isLoading = useAppSelector(state => state.mainCategory.isLoading)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.mainCategory.error)
  const { isModalConfirmOpen, openConfirmModal, closeConfirmModal, handleConfirm } = useModalConfirm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [categoryData, setCategoryData] = useState({})
  const [confirmMessage, setConfirmMessage] = useState('')

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleAddMainCategory = () => {
    setIsEditing(false)
    setCategoryData({
      title: '',
      image: '',
    })
    toggleModal()
  }

  const handleEditMainCategory = category => {
    setIsEditing(true)
    setCategoryData(category)
    toggleModal()
  }

  const handleDeleteMainCategory = (id, title) => {
    setConfirmMessage(`Ви впевнені, що хочете видалити категорію ${title}?`)
    openConfirmModal(() => {
      dispatch(removeMainCategoryThunk(id))
      setConfirmMessage('')
    })
  }

  return (
    <>
      {isLoading && <Loader />}
      <ModalConfirm
        isModalConfirmOpen={isModalConfirmOpen}
        handleConfirm={handleConfirm}
        closeConfirmModal={closeConfirmModal}
        message={confirmMessage}
      />
      <ModalMainCategory isOpen={isModalOpen} onClose={toggleModal} categoryData={categoryData} isEditing={isEditing} />
      <button type="button" onClick={handleAddMainCategory}>
        Додати категорію
        <span>
          <IoAddCircleOutline />
        </span>
      </button>

      {mainCategories && (
        <div>
          <table className="table productTable">
            <thead>
              <tr>
                <th scope="col">Фото</th>
                <th scope="col">Назва</th>
                <th scope="col">Оновити</th>
                <th scope="col">Видалити</th>
              </tr>
            </thead>
            <tbody>
              {mainCategories &&
                mainCategories.map(category => (
                  <tr key={category.id}>
                    <th scope="row">
                      <Image
                        className={s.image}
                        src={category?.image}
                        alt="category"
                        width="20"
                        height="20"
                        sizes="100vw"
                        priority={true}
                      />
                    </th>
                    <td>{category.title}</td>

                    <td>
                      <button type="button" className={s.button} onClick={() => handleEditMainCategory(category)}>
                        <RxUpdate />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={s.button}
                        onClick={() => handleDeleteMainCategory(category.id, category.title)}
                      >
                        <RiDeleteBin2Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
