'use client'

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks'
import { fetchOrderByUserThunk } from '@/app/redux/features/order/thunks'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Profile = () => {
  const user = useAppSelector(state => state.auth.user)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const orders = useAppSelector(state => state.orderByUser.items)
  console.log('orders', orders)

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!isAuth && !user?.id) {
      return router.push('/login')
    }
    dispatch(fetchOrderByUserThunk(user.id))
  }, [dispatch, isAuth, router, user])

  return (
    <div>
      <h1>Мій профіль</h1>
      {user.avatar && (
        <div>
          <Image src={user.avatar} alt={user.firstName} width={100} height={100} />
        </div>
      )}
      <h2>Ім'я: {user.firstName}</h2>
      <h2>Призвище: {user.lastName}</h2>
      <h2>Електронна пошта: {user.email}</h2>
      <h2>Телефон: {user.phone}</h2>

      {orders.length > 0 &&
        orders.map(order => (
          <ul key={order.id}>
            <li>
              <div className="card-body">
                <h2 className="card-title">Замовлення № {order.orderNumber}</h2>
                <p>Дата замовлення: {order.createdAt}</p>
                {order.products.map(product => (
                  <ul key={product.id} className="card_products">
                    <li className="card-body">
                      <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-xl" />
                      <h2 className="card-title">{product.name}</h2>
                      <p>Розмір: {product.size}</p>
                      <p>Колір: {product.color}</p>
                      <p>Артикул: {product.article}</p>
                      <p>Кількість: {product.quantity}</p>
                      <p>Ціна: {product.price} грн.</p>
                    </li>
                  </ul>
                ))}
                <h2>Адреса</h2>
                <p>Спосіб доставки: {order.address.provider}</p>
                <p>Область: {order.address.region}</p>
                <p>Місто: {order.address.city}</p>
                <p>Відділення: {order.address.department}</p>
              </div>
            </li>
            <p>Загальна ціна: {order.totalPrice} грн.</p>
          </ul>
        ))}
    </div>
  )
}

export default Profile
