'use client'

import React, { useState } from 'react'
import { Product } from './Product/Product'
import { MainCategory } from './MainCategory/MainCategory'
import { Category } from './Category/Category'
import Link from 'next/link'
import { Order } from './Order/Order'

export const Dashboard = () => {
  const [page, setPage] = useState('product')
  let content

  switch (page) {
    case 'order':
      content = <Order />
      break
    case 'product':
      content = <Product />
      break
    case 'category':
      content = <Category />
      break
    case 'mainCategory':
      content = <MainCategory />
      break
    default:
      content = <MainCategory />
  }

  return (
    <>
      <div>
        <ul>
          <li onClick={() => setPage('order')}>Замовлення</li>
          <li onClick={() => setPage('product')}>Product</li>
          <li onClick={() => setPage('category')}>Category</li>
          <li onClick={() => setPage('mainCategory')}>Main Category</li>
        </ul>
        {content}
      </div>
    </>
  )
}
