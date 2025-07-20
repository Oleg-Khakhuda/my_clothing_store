'use client'

import React from 'react'
import Link from 'next/link'
import s from './layout.module.scss'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/app/redux/hooks'

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthAdmim = useAppSelector(state => state.auth.user?.role)
  const isActive = path => {
    return pathname === path ? s.active : ''
  }
  const isActiveOrders = isActive('/dashboard/orders')
  const isActiveProducts = isActive('/dashboard/products')
  const isActiveMainCategories = isActive('/dashboard/mainCategories')
  const isActiveCategories = isActive('/dashboard/categories')

  if (isAuthAdmim !== 'administrator') {
    return router.push('/login')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-layout__sidebar">
        <ul>
          <li>
            <Link href="/dashboard/orders" className={isActiveOrders}>
              Orders
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products" className={isActiveProducts}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/mainCategories" className={isActiveMainCategories}>
              Головні категорії
            </Link>
          </li>
          <li>
            <Link href="/dashboard/categories" className={isActiveCategories}>
              Categories
            </Link>
          </li>
        </ul>
      </div>
      <div className="dashboard-layout__content">{children}</div>
    </div>
  )
}
