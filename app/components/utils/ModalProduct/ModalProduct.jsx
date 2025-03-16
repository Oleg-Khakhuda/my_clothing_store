'use client'

import React, { useEffect, useState } from 'react'

import s from './ModalProduct.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { fetchCategoryThunk } from '../../../redux/features/categories/thunks'
import { removeProductImageThunk } from '../../../redux/features/products/thunks'
import Image from 'next/image'
import allSizes from '../../../sizes.json'
import { useModalConfirm } from '../../hooks/useModalConfirm'
import { ModalConfirm } from '../ModalConfirmation/ModalConfirm'

export const ModalProduct = ({ isOpen, onClose, onSubmit, productData, isEditing }) => {
  const dispatch = useAppDispatch()

  const { isModalConfirmOpen, openConfirmModal, closeConfirmModal, handleConfirm } = useModalConfirm()

  const [formProductData, setFormProductData] = useState({})

  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const categories = useAppSelector(state => state.category.items)

  const [mainId, setMainId] = useState('')
  const [mainSlug, setMainSlug] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [sizesPrev, setSizesPrev] = useState(Object.values(allSizes))
  const [previewImage, setPreviewImage] = useState([])

  useEffect(() => {
    if (mainCategories) {
      setMainSlug(productData?.genderCategory?.slug || mainCategories[0]?.slug)
      setMainId(productData?.genderCategory?.id || mainCategories[0]?.id)
    }
  }, [mainCategories, productData?.genderCategory?.id, productData?.genderCategory?.slug])

  useEffect(() => {
    if (mainSlug) {
      dispatch(fetchCategoryThunk(mainSlug))
    }
  }, [dispatch, mainSlug])

  useEffect(() => {
    if (categories) {
      setCategoryId(productData?.category?.id || categories[0]?.id)
    }
  }, [dispatch, categories, productData?.category?.id])

  const handleChangeMain = e => {
    setMainId(e.target.value)
    const mainCategory = mainCategories.find(mainCategory => mainCategory.id === e.target.value)
    setMainSlug(mainCategory.slug)
  }

  const handleChangeCategory = e => {
    setCategoryId(e.target.value)
    const category = categories.find(category => category.id === e.target.value)
    setCategoryId(category.id)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormProductData({ ...formProductData, [name]: value })
  }

  const handleInputSizeChange = e => {
    const { value } = e.target
    const isSelected = formProductData?.sizeList.includes(value)

    if (isSelected) {
      setFormProductData(prevProduct => ({
        ...prevProduct,
        sizeList: prevProduct.sizeList.filter(size => size !== value),
      }))
    } else {
      setFormProductData(prevProduct => ({
        ...prevProduct,
        sizeList: [...prevProduct.sizeList, value],
      }))
    }
  }

  const checkedSize = el => {
    return formProductData.sizeList?.includes(el)
  }

  const handleImageUpload = e => {
    const { files } = e.target

    // Перетворюємо FileList у масив
    const fileArray = Array.from(files)

    const newPreviewImages = fileArray.map(file => URL.createObjectURL(file))
    setPreviewImage(prevImages => [...prevImages, ...newPreviewImages])

    setFormProductData(prevData => ({
      ...prevData,
      newImage: prevData.newImage ? [...prevData.newImage, ...fileArray] : fileArray,
    }))
  }

  const handleImageDelete = (id, idFileCloud) => {
    openConfirmModal(() => {
      dispatch(removeProductImageThunk({ id, idFileCloud })).then(data =>
        setFormProductData({ ...formProductData, productImage: data.payload.updateProduct.image }),
      )
    })
  }

  const handlePreviewImageDelete = (file, index) => {
    openConfirmModal(() => {
      const newPreviewImage = previewImage.filter(el => el !== file)
      setPreviewImage(newPreviewImage)

      handleNewImageDelete(index)
    })
  }

  const handleNewImageDelete = index => {
    const newImage = formProductData.newImage.filter((el, i) => i !== index)
    setFormProductData({ ...formProductData, newImage })
  }

  useEffect(() => {
    if (productData) {
      setFormProductData(prevProduct => ({
        ...prevProduct,
        id: productData?.id || '',
        mainCategory: productData?.genderCategory?.id || mainId,
        category: productData?.category?.id || categoryId,
        name: productData?.name || '',
        description: productData?.description || '',
        sizeList: productData?.sizeList || [],
        color: productData?.color || '',
        quantity: productData?.quantity || '',
        price: productData?.price || '',
        productImage: productData?.image || [],
        newImage: [],
      }))
    }
  }, [categoryId, mainId, productData])

  const handleSubmit = e => {
    e.preventDefault()

    const { name, quantity, color, sizeList, price, description, newImage, id } = formProductData
    const formData = new FormData()
    formData.append('genderCategory', mainId)
    formData.append('category', categoryId)
    formData.append('name', name)
    formData.append('quantity', quantity)
    for (const size of sizeList) {
      formData.append('sizeList', size)
    }
    formData.append('color', color)
    formData.append('price', price)
    formData.append('description', description)
    for (const key of Object.keys(newImage)) {
      formData.append('image', newImage[key])
    }

    onSubmit(id, formData)
    console.log('formProductData', formProductData)

    setFormProductData({})
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setPreviewImage([])
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <ModalConfirm
        isModalConfirmOpen={isModalConfirmOpen}
        handleConfirm={handleConfirm}
        closeConfirmModal={closeConfirmModal}
      />

      <div onClick={onClose} className={s.modal_overlay}></div>
      <div className={s.modal}>
        <h1 className={s.title}>Додати товар до магазину</h1>
        <div className={s.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={s.form_group}>
              <label>Головна категорія</label>
              <select name="mainId" value={mainId} onChange={handleChangeMain} className={s.form_control}>
                {mainCategories?.map(el => (
                  <option key={el.id} value={el.id} className={s.option}>
                    {el.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={s.form_group}>
              <label>Категорія</label>
              <select name="categoryId" value={categoryId} onChange={handleChangeCategory} className={s.form_control}>
                {categories
                  ? categories.map(el => (
                      <option key={el.id} value={el.id}>
                        {el.title}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            <div className={s.form_group}>
              <label>Зображення</label>
              <input type="file" name="productImage" onChange={handleImageUpload} className={s.form_control} multiple />
            </div>

            <div>
              {previewImage.length > 0 && (
                <div>
                  <p>Нові зображення</p>
                  <ul className={s.images_box}>
                    {previewImage.map((file, index) => (
                      <li key={index} className={s.itemImg}>
                        <Image src={file} alt={file} className={s.image} width={50} height={50} />
                        <button type="button" onClick={() => handlePreviewImageDelete(file, index)}>
                          Видалити зображення
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              {productData && (
                <div>
                  <p>Завантажені зображення</p>
                  <ul className={s.images_box}>
                    {formProductData?.productImage?.map((file, index) => (
                      <li key={index} className={s.itemImg}>
                        <Image src={file.url} alt={file} className={s.image} width={50} height={50} />
                        <button type="button" onClick={() => handleImageDelete(productData.id, file.idFileCloud)}>
                          Видалити зображення з сервера
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={s.form_group}>
              <label>Назва</label>
              <input
                type="text"
                name="name"
                value={formProductData.name}
                onChange={handleInputChange}
                className={s.form_control}
              />
            </div>

            <div className={s.form_group}>
              <label>Опис</label>
              <input
                type="text"
                name="description"
                value={formProductData.description}
                onChange={handleInputChange}
                className={s.form_control}
              />
            </div>

            <div className={s.form_group}>
              <p>Розмір</p>
              <ul>
                {sizesPrev
                  ? sizesPrev.map((el, index) => (
                      <li key={index} value={formProductData.sizeList}>
                        <label>{el}</label>
                        <input
                          type="checkbox"
                          name="size"
                          value={el}
                          checked={checkedSize(el)}
                          onChange={handleInputSizeChange}
                          className={s.form_control}
                        />
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div className={s.form_group}>
              <label>Колір</label>
              <input
                type="text"
                name="color"
                value={formProductData.color}
                onChange={handleInputChange}
                className={s.form_control}
              />
            </div>

            <div className={s.form_group}>
              <label>Кількість</label>
              <input
                type="text"
                name="quantity"
                value={formProductData.quantity}
                onChange={handleInputChange}
                className={s.form_control}
              />
            </div>

            <div className={s.form_group}>
              <label>Ціна</label>
              <input
                type="text"
                name="price"
                value={formProductData.price}
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
      </div>
    </>
  )
}
