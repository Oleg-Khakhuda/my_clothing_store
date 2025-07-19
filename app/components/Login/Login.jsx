'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/app/redux/hooks'
import { loginThunk } from '../../redux/features/auth/thunks'

import { useRouter } from 'next/navigation'
import s from './Login.module.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const user = { email, password }
    dispatch(loginThunk(user)).then(res => {
      if (res.error) {
        console.log('error', res.error)
      } else {
        router.push('/')
      }
    })

    reset()
  }

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <h2 className={s.title}>Вхід</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>Email</label>
        <input
          className={s.input}
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        ></input>
        <label className={s.label}>Password</label>
        <input
          className={s.input}
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        ></input>

        <button className={s.button} type="submit">
          Ввійти
        </button>
      </form>
      {/* {isAuth && <Navigate to="/contacts" />} */}
    </>
  )
}

export default Login
