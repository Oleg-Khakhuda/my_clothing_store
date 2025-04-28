'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore } from '../app/redux/store'
import { persistStore } from 'redux-persist'
import { fetchMainCategoryThunk } from './redux/features/mainCategories/thunks'
import { fetchProductsThunk } from './redux/features/products/thunks'

export default function StoreProvider({ children }) {
  const storeRef = useRef(null)
  const persistorRef = useRef(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()

    storeRef.current.dispatch(fetchMainCategoryThunk())
    storeRef.current.dispatch(fetchProductsThunk())
  }
  if (!persistorRef.current) {
    persistorRef.current = persistStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}
