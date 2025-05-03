'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import s from '../Product/Product.module.scss'
import { fetchProductByIdThunk, removeProductThunk } from '@/app/redux/features/products/thunks'
import { GiShoppingCart } from 'react-icons/gi'
import { useAppSelector, useAppStore, useAppDispatch } from '@/app/redux/hooks'
import { addToCart } from '@/app/redux/features/cart/slices'

const Product = ({ productId }) => {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(fetchProductByIdThunk(productId))
    initialized.current = true
  }

  const dispatch = useAppDispatch()

  const product = useAppSelector(state => state.productById.items)

  const [size, setSize] = useState('')

  const [dataProduct, setDataProduct] = useState({})

  useEffect(() => {
    if (!product) return

    // Ініціалізуємо `size` лише при першому завантаженні
    if (product.sizeList?.length > 0 && !size) {
      setSize(product.sizeList[0])
    }
  }, [product, size])

  useEffect(() => {
    if (product) {
      setDataProduct({
        productId: product.id,
        name: product.name,
        article: product.article || '',
        price: product.price,
        color: product.color,
        image: product.image?.[0]?.url || '',
        size: size || product.sizeList?.[0] || '',
      })
    }
  }, [product, size])

  // console.log(dataProduct)

  const handleInputChange = e => {
    setSize(e.target.value)
  }

  const handlAddToCart = e => {
    e.preventDefault()
    if (!dataProduct.size) {
      alert('Виберіть розмір')
      return
    }
    dispatch(addToCart(dataProduct))
    // const formData = new FormData()
    // formData.append('productId', formProduct.productId)
    // formData.append('name', formProduct.name)
    // formData.append('article', formProduct.article)
    // formData.append('price', formProduct.price)
    // formData.append('color', formProduct.color)
    // formData.append('image', formProduct.image)
    // formData.append('size', formProduct.size)
    // dispatch(addProductToBasketThunk(formData))
  }

  // const handleUpdateClick = e => {}

  // const handleDeleteClick = () => {
  //   dispatch(removeProductThunk(productId))
  // }

  return (
    <>
      {product ? (
        <>
          <div className={s.card}>
            <ul>
              {product.image &&
                product.image.map((img, index) => (
                  <li key={index}>
                    <Image className={s.img} src={img.url} alt="product" width="0" height="0" sizes="100vh" priority />
                  </li>
                ))}
            </ul>
            <div className={s.desc_block}>
              <p className={s.title}>{product.name}</p>
              <p className={s.art}>арт: {product.article}</p>
              <p className={s.price}>{product.price} ₴</p>
              <p className={s.status}>{product.status}</p>
              <h3 className={s.title_description}>ОПИС</h3>
              <p className={s.description}>{product.description}</p>
            </div>

            <div className={s.size_box}>
              <ul className={s.list_size}>
                {product.sizeList &&
                  product.sizeList?.map((size, index) => (
                    <li key={index}>
                      <div className={s.size}>
                        <label>{size}</label>
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={size === dataProduct.size}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <button type="submit" className={s.button} onClick={handlAddToCart}>
              <GiShoppingCart />
              <p>В КОШИК</p>
            </button>
            {/* <button type="button" className={s.button} onClick={handleUpdateClick}>
              <GiShoppingCart />
              <p>UPDATE</p>
            </button>
            <button type="button" className={s.button} onClick={handleDeleteClick}>
              <GiShoppingCart />
              <p>DELETE</p>
            </button> */}
          </div>
        </>
      ) : (
        <p className={s.error}>Щось пішло не так, спробуйте пізніше!</p>
      )}
    </>
  )
}

export default Product
