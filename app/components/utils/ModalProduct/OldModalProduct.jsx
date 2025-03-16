'use client'

import React, { useEffect, useState } from 'react'

import s from './ModalProduct.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { fetchCategoryThunk } from '../../../redux/features/categories/thunks'
import { addProductThunk, updateProductThunk } from '@/app/redux/features/products/thunks'
import Image from 'next/image'
import allSizes from '../../../sizes.json'
import useProductForm from '../../hooks/useProductForm'

export const ModalProduct = ({ updateProduct }) => {
  // console.log(updateProduct)

  const dispatch = useAppDispatch()

  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const categories = useAppSelector(state => state.category.items)

  const [mainId, setMainId] = useState('')
  const [mainSlug, setMainSlug] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [sizeAdd, setSizeAdd] = useState([])
  const [sizesPrev, setSizesPrev] = useState(Object.values(allSizes))
  const [previewImage, setPreviewImage] = useState(updateProduct?.image || [])
  const [image, setImage] = useState([])

  // console.log(sizeAdd)

  // const { product, handleInputChange, handleInputSizeChange, handleImageUpload } = useProductForm(updateProduct)

  useEffect(() => {
    if (mainCategories) {
      setMainSlug(mainCategories[0]?.slug || '')
      setMainId(mainCategories[0]?.id || '')
    }
  }, [dispatch, mainCategories])

  useEffect(() => {
    if (mainSlug) {
      dispatch(fetchCategoryThunk(mainSlug))
    }
  }, [dispatch, mainSlug])

  useEffect(() => {
    if (categories) {
      setCategoryId(categories[0]?.id || '')
    }
  }, [dispatch, categories])

  useEffect(() => {
    if (updateProduct) {
      let sizeList = []
      updateProduct.sizeList.map(size => sizeList.push(size))
      console.log(sizeList)
      setSizeAdd(sizeList)
    }
  }, [updateProduct])

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
    setProduct({ ...product, [name]: value })
  }

  const handleInputSizeChange = e => {
    const { value } = e.target
    const isSelected = sizeAdd.includes(value)

    if (isSelected) {
      setSizeAdd(sizeAdd.filter(size => size !== value))
    } else {
      setSizeAdd([...sizeAdd, value])
    }
  }

  const handleImageUpload = e => {
    // const files = Array.from(e.target.files);
    // setProduct({ images: e.target.files });

    const { name, value } = e.target.files
    setProduct({ ...product, [name]: value })

    let fileObj = []
    let fileArray = []

    fileObj.push(e.target.files)

    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]))
      setImage(fileArray)
    }
    setProduct({ ...product, productImage: e.target.files })
  }

  useEffect(() => {
    setProduct(prevProduct => ({
      ...prevProduct,
      mainCategory: mainId,
      category: categoryId,
    }))
  }, [mainId, categoryId])

  const [product, setProduct] = useState({
    mainCategory: '',
    category: '',
    name: updateProduct?.name || '',
    description: updateProduct?.description || '',
    sizeList: sizeAdd,
    color: updateProduct?.color || '',
    quantity: updateProduct?.quantity || '',
    price: updateProduct?.price || '',
    productImage: [],
  })

  const handleSubmit = e => {
    e.preventDefault()
    try {
      const { name, quantity, color, price, description, productImage } = product
      const formData = new FormData()
      formData.append('genderCategory', mainId)
      formData.append('category', categoryId)
      formData.append('name', name)
      formData.append('quantity', quantity)
      for (const size of sizeAdd) {
        formData.append('sizeList', size)
      }
      formData.append('color', color)
      formData.append('price', price)
      formData.append('description', description)
      for (const key of Object.keys(productImage)) {
        formData.append('image', productImage[key])
      }

      if (updateProduct) {
        console.log(product)

        dispatch(updateProductThunk({ id: updateProduct.id, formData }))
      } else {
        dispatch(addProductThunk(formData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkedSize = el => {
    return sizeAdd.includes(el)
  }

  return (
    <>
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
            {product.productImage.length > 0 && (
              <div>
                <p>Нові зображення</p>
                <ul className={s.images_box}>
                  {image.map((file, index) => (
                    <li key={index} className={s.itemImg}>
                      <Image src={file} alt={file} className={s.image} width={50} height={50} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {updateProduct && (
              <div>
                <p>Завантажені зображення</p>
                <ul className={s.images_box}>
                  {updateProduct?.image.map((file, index) => (
                    <li key={index} className={s.itemImg}>
                      <Image src={file.url} alt={file} className={s.image} width={50} height={50} />
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
              value={product.name || updateProduct?.name}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>

          <div className={s.form_group}>
            <label>Опис</label>
            <input
              type="text"
              name="description"
              value={product.description || updateProduct.description}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>

          <div className={s.form_group}>
            <p>Розмір</p>
            <ul>
              {sizesPrev
                ? sizesPrev.map((el, index) => (
                    <li key={index} value={product.size}>
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
              value={product.color || updateProduct.color}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>

          <div className={s.form_group}>
            <label>Кількість</label>
            <input
              type="text"
              name="quantity"
              value={product.quantity || updateProduct.quantity}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>

          <div className={s.form_group}>
            <label>Ціна</label>
            <input
              type="text"
              name="price"
              value={product.price || updateProduct.price}
              onChange={handleInputChange}
              className={s.form_control}
            />
          </div>

          <button type="submit" className={`${s.btn} ${s.btn_primary}`}>
            {updateProduct ? 'Оновити товар' : 'Додати товар'}
          </button>
        </form>
      </div>
    </>
  )
}
