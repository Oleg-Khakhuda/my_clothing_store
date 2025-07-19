'use client'

import s from './page.module.scss'
import Hero from './components/Hero/Hero'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import MainCategories from './components/MainCategories/MainCategories'
import NewProducts from './components/NewProducts/NewProducts'
import { useEffect } from 'react'
import { currentThunk } from './redux/features/auth/thunks'
import { useStore } from 'react-redux'

export const dynamic = 'force-dynamic'

const Home = () => {
  const store = useStore()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Це виконається тільки на клієнті після гіддрації
    const state = store.getState()
    const token = state.auth.token

    if (!token && state.auth?.user?.id !== '') {
      return
    } else if (token && state.auth?.user?.id === '') {
      dispatch(currentThunk(token))
    }
  }, [dispatch, store])

  return (
    <>
      <main className={s.main}>
        <Hero />
        <MainCategories />
        <NewProducts />
      </main>
    </>
  )
}

export default Home
