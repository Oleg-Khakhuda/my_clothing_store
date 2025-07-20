import React from 'react'
import s from './Logo.module.scss'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} rel="preload">
      <div className={s.logo}>
        VAB <span>womans</span>
      </div>
    </Link>
  )
}

export default Logo
