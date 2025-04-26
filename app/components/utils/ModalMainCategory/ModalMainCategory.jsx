import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import { ModalConfirm } from '../ModalConfirmation/ModalConfirm'
import { useModalConfirm } from '../../hooks/useModalConfirm'
import { useAppDispatch } from '../../../redux/hooks'
import { addMainCategoryThunk, updateMainCategoryThunk } from '../../../redux/features/mainCategories/thunks'

import s from './ModalMainCategory.module.scss'

export const ModalMainCategory = ({ categoryData, isOpen, onClose, isEditing }) => {
  const [formCategoryData, setFormCategoryData] = useState(categoryData)
  const [previewImage, setPreviewImage] = useState([])
  const { isModalConfirmOpen, openConfirmModal, closeConfirmModal, handleConfirm } = useModalConfirm()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryData) {
      setFormCategoryData(prevProduct => ({
        ...prevProduct,
        id: categoryData?.id || '',
        title: categoryData?.title || '',
        image: categoryData?.image || [],
        newImage: {},
      }))
    }
  }, [categoryData])

  const handleChangeMain = e => {
    setMainId(e.target.value)
    const mainCategory = mainCategories.find(mainCategory => mainCategory.id === e.target.value)
    setMainSlug(mainCategory?.slug)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormCategoryData({ ...formCategoryData, [name]: value })
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]

    const newPreviewImage = URL.createObjectURL(file)
    setPreviewImage(newPreviewImage)

    setFormCategoryData(prevProduct => ({
      ...prevProduct,
      newImage: file,
    }))
  }

  const clearModal = useCallback(() => {
    setFormCategoryData(prevState => ({
      ...prevState,
      title: categoryData?.title || '',
      image: categoryData?.image || [],
      newImage: {},
    }))
  }, [categoryData])

  const onSubmit = (id, formData) => {
    if (isEditing) {
      openConfirmModal(() => {
        dispatch(updateMainCategoryThunk({ id: id, formData })).then(res => {
          if (res.payload.status === 'success') {
            clearModal()
            onClose()
          }
        })
      })
    } else {
      dispatch(addMainCategoryThunk(formData)).then(res => {
        if (res.payload.status === 'success') {
          clearModal()
          onClose()
        }
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const { title, image, newImage, id } = formCategoryData
    const formData = new FormData()
    formData.append('title', title)
    if (newImage.name) {
      formData.append('image', newImage)
    } else {
      formData.append('image', image)
    }
    onSubmit(id, formData)
  }

  useEffect(() => {
    if (isOpen) {
      setPreviewImage([])
      setFormCategoryData(prevState => ({
        ...prevState,
        newImage: {},
      }))
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div onClick={onClose} className={s.modal_overlay}></div>
      <div className={s.modal}>
        <form onSubmit={handleSubmit}>
          <div className={s.form_group}>
            <label>Зображення</label>
            <input type="file" name="image" onChange={handleImageUpload} className={s.form_control} />
          </div>
          {previewImage.length > 0 && (
            <div>
              <p className={s.preview_text}>Нове зображення:</p>
              <div>
                <Image className={s.image_preview} src={previewImage} alt="Preview" width={100} height={100} />
              </div>
            </div>
          )}
          {formCategoryData?.image?.length > 0 && (
            <div className={s.image_preview}>
              <Image
                src={formCategoryData?.image}
                alt={formCategoryData?.title}
                className={previewImage.length > 0 ? s.image_grey : s.image}
                priority={true}
                width={100}
                height={100}
              />
            </div>
          )}
          <div className={s.form_group}>
            <label>Назва</label>
            <input
              type="text"
              name="title"
              value={formCategoryData?.title}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>
          <button type="submit" className={s.btn}>
            {isEditing ? 'Оновити товар' : 'Додати товар'}
          </button>
          <button type="button" onClick={onClose}>
            Скасувати
          </button>
        </form>
      </div>
      <ModalConfirm
        isModalConfirmOpen={isModalConfirmOpen}
        handleConfirm={handleConfirm}
        closeConfirmModal={closeConfirmModal}
        message={
          isEditing
            ? `Ви впевнені, що хочете оновити категорію ${formCategoryData?.title}?`
            : `Ви впевнені, що хочете додати категорію ${formCategoryData?.title}?`
        }
      />
    </>
  )
}
