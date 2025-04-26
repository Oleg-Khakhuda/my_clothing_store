'use client'

import React, { useState } from 'react'
import { Product } from './Product/Product'
import { MainCategory } from './MainCategory/MainCategory'
import { Category } from './Category/Category'
import Link from 'next/link'

export const Dashboard = () => {
  const [page, setPage] = useState('product')
  let content

  if (page === 'product') {
    content = <Product />
  } else if (page === 'category') {
    content = <Category />
  } else {
    content = <MainCategory />
  }

  return (
    <>
      <div>
        <ul>
          <li onClick={() => setPage('product')}>Product</li>
          <li onClick={() => setPage('category')}>Category</li>
          <li onClick={() => setPage('mainCategory')}>Main Category</li>
        </ul>
        {content}
      </div>
    </>
  )
}
