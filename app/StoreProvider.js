'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../app/redux/store'
import { fetchMainCategoryThunk } from './redux/features/mainCategories/thunks'
import { fetchProductsThunk } from './redux/features/products/thunks'

export default function StoreProvider({ children }) {
  const storeRef = useRef(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(fetchMainCategoryThunk())
    storeRef.current.dispatch(fetchProductsThunk())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
