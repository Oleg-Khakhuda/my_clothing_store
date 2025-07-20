'use client'

import Image from 'next/image'
import Link from 'next/link'
import s from './MainCategories.module.scss'
import { useAppSelector, useAppStore } from '../../redux/hooks'
import { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
// import { fetchMainCategoryThunk } from '@/app/redux/features/mainCategories/thunks'
// import { useRef } from 'react'

const MainCategories = () => {
  // const store = useAppStore()
  // const initialized = useRef(false)
  // if (!initialized.current) {
  //   store.dispatch(fetchMainCategoryThunk())
  //   initialized.current = true
  // }

  const mainCategories = useAppSelector(state => state.mainCategory.items)
  const isLoading = useAppSelector(state => state.mainCategory.isLoading)

  // Expected server HTML to contain a matching <div> in <div>. Error Component Stack

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <h2 className={s.title}>Обирай одяг для всієї сім'ї</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={s.category_list}>
          {mainCategories ? (
            mainCategories.map(category => (
              <li className={s.category_item} key={category.id}>
                <Link rel="preload" className={s.category_link} href={`${String(category.slug)}/all`}>
                  <Image
                    className={s.category_image}
                    src={category.image}
                    alt="category"
                    width={600}
                    height={450}
                    priority={true}
                  />
                  <h2 className={s.category_title}>{category.title}</h2>
                </Link>
              </li>
            ))
          ) : (
            <div>Щось пішло не так! Спробуйте перезавантажити сторінку.</div>
          )}
        </ul>
      )}
    </div>
  )
}

export default MainCategories
