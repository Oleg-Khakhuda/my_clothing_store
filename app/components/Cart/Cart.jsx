import React from 'react'
import s from './Cart.module.scss'
import Link from 'next/link'
import { SlBasket } from 'react-icons/sl'

const Cart = () => {
  return (
    <div className={s.basket}>
      <Link href={'/cart'} rel="preload">
        <span className={s.basket_icon}>
          <SlBasket />
        </span>
        <div className={s.counter}>0</div>
      </Link>
    </div>
  )
}

export default Cart
