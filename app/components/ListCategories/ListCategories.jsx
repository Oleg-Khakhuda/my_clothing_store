'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAppStore, useAppSelector } from '@/app/redux/hooks'
import s from './ListCategories.module.scss'
import { fetchCategoryThunk } from '@/app/redux/features/categories/thunks'
import { useRef } from 'react'

const ListCategories = ({ mainSlug }) => {
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(fetchCategoryThunk(mainSlug))
    initialized.current = true
  }

  const categories = useAppSelector(state => state.category.items)

  return (
    <div className={s.category}>
      <ul className={s.list_category}>
        <li className={s.category_item}>
          <Link className={s.link} rel="preload" href={`/${mainSlug}/all`}>
            <p className={`${s.title} ${s.all_title}`}>ALL</p>
          </Link>
        </li>
        {categories ? (
          categories.map(category => (
            <li className={s.category_item} key={category.id}>
              <Link className={s.link} rel="preload" href={category.slug}>
                <div className={s.image_block}>
                  <Image className={s.image} src={category.image} alt="category" width={50} height={70} priority />
                </div>
                <p className={s.title}>{category.title.toUpperCase()}</p>
              </Link>
            </li>
          ))
        ) : (
          <div>Категорії не знайдено</div>
        )}
      </ul>
    </div>
  )
}

export default ListCategories
