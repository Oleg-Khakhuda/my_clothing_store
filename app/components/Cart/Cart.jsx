import React from 'react'
import s from './Cart.module.scss'
import Link from 'next/link'
import { useAppSelector } from '@/app/redux/hooks'
import { SlBasket } from 'react-icons/sl'

const Cart = () => {
  const cart = useAppSelector(state => state.cart.items)

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className={s.basket}>
      <Link href={'/cart'} rel="preload">
        <span className={s.basket_icon}>
          <SlBasket />
        </span>
        <div className={s.counter}>{totalQuantity}</div>
      </Link>
    </div>
  )
}

export default Cart
