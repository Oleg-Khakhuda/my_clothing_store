'use client'

import s from './NewProducts.module.scss'
import Slider from '../Slider/Slider'
import { useAppSelector } from '../../redux/hooks'
import { useState, useEffect } from 'react'

const NewProducts = () => {
  const allProducts = useAppSelector(state => state.products.items)
  const products = allProducts.slice(0, 9)

  // Expected server HTML to contain a matching <div> in <div>. Error Component Stack

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {products && (
        <div className={s.slider}>
          <h2 className={s.title}>Новинки</h2>
          <Slider products={products} />
        </div>
      )}
    </>
  )
}

export default NewProducts
