'use client'

import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useRef } from 'react'
import s from './Product.module.scss'
import { useAppDispatch, useAppSelector, useAppStore } from '../../../redux/hooks'
// import { fetchMainCategoryThunk } from '../../../redux/features/mainCategories/thunks'
// import { GiDistressSignal } from 'react-icons/gi'
import { fetchCategoryThunk } from '../../../redux/features/categories/thunks'
import { addProductThunk, fetchProductsThunk } from '@/app/redux/features/products/thunks'
import Image from 'next/image'
import allSizes from '../../../sizes.json'

export const Product = () => {
  const dispatch = useAppDispatch()

  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const categories = useAppSelector(state => state.category.items)

  const [mainId, setMainId] = useState('')
  const [mainSlug, setMainSlug] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [sizeAdd, setSizeAdd] = useState([])
  const [sizesPrev, setSizesPrev] = useState(Object.values(allSizes))
  const [previewImage, setPreviewImage] = useState([])

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
      setPreviewImage(fileArray)
    }
    setProduct({ ...product, productImage: e.target.files })
  }

  const [product, setProduct] = useState({
    mainCategory: mainId,
    category: categoryId,
    name: '',
    description: '',
    sizeList: sizeAdd,
    color: '',
    quantity: '',
    price: '',
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
      formData.append('sizeList', sizeAdd)
      formData.append('color', color)
      formData.append('price', price)
      formData.append('description', description)
      for (const key of Object.keys(productImage)) {
        formData.append('image', productImage[key])
      }

      dispatch(addProductThunk(formData))
      dispatch(fetchProductsThunk())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="dashboard">
      <h1 className="title">Додати товар до магазину</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Гендер</label>
            <select name="mainId" value={mainId} onChange={handleChangeMain} className="form-control">
              {mainCategories
                ? mainCategories.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div className="form-group">
            <label>Категорія</label>
            <select name="categoryId" value={categoryId} onChange={handleChangeCategory} className="form-control">
              {categories
                ? categories.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div className="form-group">
            <label>Зображення</label>
            <input type="file" name="productImage" onChange={handleImageUpload} className="form-control" multiple />
          </div>

          <div>
            {product.productImage && (
              <ul className={s.images_box}>
                {previewImage.map((file, index) => (
                  <li key={index} className={s.itemImg}>
                    <Image src={file} alt={file} className={s.image} width={150} height={150} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>Назва</label>
            <input type="text" name="name" value={product.name} onChange={handleInputChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Опис</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
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
                        onChange={handleInputSizeChange}
                        className="form-control"
                      />
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div className="form-group">
            <label>Колір</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Кількість</label>
            <input
              type="text"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Ціна</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Додати товар
          </button>
        </form>
      </div>

      {/* Таблиця для відображення доданих товарів */}
      {/* <table className="table productTable">
        <thead>
          <ul>
            <p>Назва</p>
            <p>Опис</p>
            <p>Розмір</p>
            <p>Колір</p>
            <p>Кількість</p>
            <p>Ціна</p>
            <p>Зображення</p>
          </ul>
        </thead>
        <tbody>
          {/* Додайте код для відображення доданих товарів у таблиці */}
      {/* </tbody>
      </table> */}
    </div>
  )
}
