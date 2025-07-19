'use client'

import React, { use } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'

export const Order = () => {
  const token = useAppSelector(state => state.auth.token)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:7000/api/orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log(data)
    }
    fetchData()
  }, [token])
  return <div>Order</div>
}
