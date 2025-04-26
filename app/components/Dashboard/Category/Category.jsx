import React from 'react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Image from 'next/image'
import Loader from '../../Loader/Loader'
import { ModalConfirm } from '../../utils/ModalConfirmation/ModalConfirm'
import { useModalConfirm } from '../../hooks/useModalConfirm'
import { ModalCategory } from '../../utils/ModalCategory/ModalCategory'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { IoAddCircleOutline } from 'react-icons/io5'
import { RxUpdate } from 'react-icons/rx'
import s from './Category.module.scss'
import { fetchCategoryThunk, removeCategoryThunk } from '../../../redux/features/categories/thunks'

export const Category = () => {
  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const categoriesSelector = useAppSelector(state => state.category.items)
  const isLoading = useAppSelector(state => state.category.isLoading)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.category.error)

  const { isModalConfirmOpen, openConfirmModal, closeConfirmModal, handleConfirm } = useModalConfirm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [categoryData, setCategoryData] = useState({})
  const [confirmMessage, setConfirmMessage] = useState('')
  const [mainId, setMainId] = useState('all')
  const [categories, setCategories] = useState(categoriesSelector)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleChangeMain = e => {
    setMainId(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchCategoryThunk())
  }, [dispatch])

  useEffect(() => {
    if (mainId === 'all') {
      setCategories(categoriesSelector)
    } else {
      const filteredCategories = categoriesSelector.filter(category => category.genderCategory === mainId)
      setCategories(filteredCategories)
    }
  }, [dispatch, mainId, categoriesSelector])

  const handleAddCategory = () => {
    setIsEditing(false)
    setCategoryData({
      genderCategory: '',
      title: '',
      image: '',
    })
    toggleModal()
  }

  const handleEditCategory = category => {
    setIsEditing(true)
    setCategoryData(category)
    toggleModal()
  }

  const handleDeleteCategory = (id, title) => {
    setConfirmMessage(`Ви впевнені, що хочете видалити категорію ${title}?`)
    openConfirmModal(() => {
      dispatch(removeCategoryThunk(id))
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
      <ModalCategory isOpen={isModalOpen} onClose={toggleModal} categoryData={categoryData} isEditing={isEditing} />
      <button type="button" onClick={handleAddCategory}>
        Додати категорію
        <span>
          <IoAddCircleOutline />
        </span>
      </button>

      <div className={s.form_group}>
        <label>Головна категорія</label>
        <select name="mainId" value={mainId} onChange={handleChangeMain} className={s.form_control}>
          <option value="all">Всі категорії</option>
          {mainCategories?.map(el => (
            <option key={el.id} value={el.id} className={s.option}>
              {el.title}
            </option>
          ))}
        </select>
      </div>

      {categories && (
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
              {categories &&
                categories.map(category => (
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
                      <button type="button" className={s.button} onClick={() => handleEditCategory(category)}>
                        <RxUpdate />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={s.button}
                        onClick={() => handleDeleteCategory(category.id, category.title)}
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
