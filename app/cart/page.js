'use client'

import React, { use, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { incrementQuantity, decrementQuantity, setQuantity } from '@/app/redux/features/cart/slices'
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks'
import s from './Cart.module.scss'
import DeliverySelection from '../components/DeliverySelection/DeliverySelection'

const Cart = () => {
  const [order, setOrder] = useState({
    firstame: '',
    lastname: '',
    phone: '',
    email: '',
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    address: { provider: '', region: '', city: '', department: '' },
  })
  const [provider, setProvider] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [department, setDepartment] = useState('')

  const cart = useAppSelector(state => state.cart.items)
  console.log(cart)

  const dispatch = useAppDispatch()

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  const handleIncrement = e => {
    const productId = e.target.dataset.productId
    const size = e.target.dataset.size
    const product = cart.find(item => item.productId === productId && item.size === size)

    if (product) {
      dispatch(incrementQuantity({ productId, size, quantity: product.quantity }))
    }
  }

  const handleDecrement = e => {
    const productId = e.target.dataset.productId
    const size = e.target.dataset.size
    const product = cart.find(item => item.productId === productId && item.size === size)

    if (product) {
      dispatch(decrementQuantity({ productId, size }))
    }
  }

  const handleDeliverySelected = deliveryInfo => {
    console.log('Вибрана доставка:', deliveryInfo)
    // Тут можна зберегти інформацію про доставку в стані або відправити на сервер
    setProvider(deliveryInfo.provider)
    setRegion(deliveryInfo.region)
    setCity(deliveryInfo.city)
    setDepartment(deliveryInfo.department)
  }

  useEffect(() => {
    setOrder(prev => ({
      ...prev,
      products: cart.map(item => ({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        article: item.article,
        image: item.image,
      })),
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      address: {
        provider: provider,
        region: region,
        city: city,
        department: department,
      },
    }))
  }, [cart, city, department, provider, region, totalPrice, totalQuantity])

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Замовлення:', order)
  }

  return (
    <>
      <div>
        <h1>Кошик</h1>
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <Link href={'/'} rel="preload">
                  <Image src={item.image} alt={item.name} width={100} height={100} className={s.img} priority />
                </Link>
                <p>{item.name}</p>
                <p>Арт: {item.article}</p>
                <p>{item.size}</p>
                <p>Колір: {item.color}</p>
                <p>Ціна: {item.price * item.quantity} ₴</p>

                <div>
                  {/* <label for="input">Number of tentacles (1-10):</label>- */}
                  <button
                    type="button"
                    onClick={handleDecrement}
                    data-product-id={item.productId}
                    data-size={item.size}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    // min="1"
                    // max="10"
                    className={s.input}
                    value={item.quantity}
                    id="input"
                    disabled
                    name="input"
                    data-size={item.size}
                    data-product-id={item.productId}
                    // onChange={handleChangeInput}
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    data-product-id={item.productId}
                    data-size={item.size}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.total}>
            <p>Total Price: {totalPrice} ₴</p>
            <p>Total Quantity: {totalQuantity} шт.</p>
            {/* <Link href={'/'} rel="preload" className={s.btn}>
              Checkout
            </Link>
            <Link href={'/'} rel="preload" className={s.btn}>
              Continue Shopping
            </Link> */}
          </div>
        </div>
      </div>
      <div>
        <DeliverySelection onDeliverySelected={handleDeliverySelected} />
      </div>
      <button type="submit" className={s.btn} onClick={handleSubmit}>
        Оформити замовлення
      </button>
    </>
  )
}

export default Cart
