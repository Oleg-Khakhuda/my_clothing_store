'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import s from '../Product/Product.module.scss'
import { fetchProductByIdThunk, removeProductThunk } from '@/app/redux/features/products/thunks'
import { useRef } from 'react'
import { GiShoppingCart } from 'react-icons/gi'
import { useAppSelector, useAppStore, useAppDispatch } from '@/app/redux/hooks'

const Product = ({ productId }) => {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(fetchProductByIdThunk(productId))
    initialized.current = true
  }

  const dispatch = useAppDispatch()

  const product = useAppSelector(state => state.productById.items)
  product.sizeList?.map(size => console.log(size))
  console.log(product)

  const handleInputChange = e => {
    setSize(e.target.value)
  }

  const handleClick = e => {
    console.log(size)
  }

  const handleUpdateClick = e => {}

  const handleDeleteClick = () => {
    dispatch(removeProductThunk(productId))
  }

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
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <button type="submit" className={s.button} onClick={handleClick}>
              <GiShoppingCart />
              <p>В КОШИК</p>
            </button>
            <button type="button" className={s.button} onClick={handleUpdateClick}>
              <GiShoppingCart />
              <p>UPDATE</p>
            </button>
            <button type="button" className={s.button} onClick={handleDeleteClick}>
              <GiShoppingCart />
              <p>DELETE</p>
            </button>
          </div>
        </>
      ) : (
        <p className={s.error}>Щось пішло не так, спробуйте пізніше!</p>
      )}
    </>
  )
}

export default Product
