'use client'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { registerThunk } from '../../redux/features/auth/thunks'
import { useRouter } from 'next/navigation'
import s from './Register.module.scss'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const isError = useAppSelector(state => state.auth.error)
  const router = useRouter()

  //   const isAuth = useAppSelector(state => state.auth.isAuth)

  const handleChange = e => {
    const { name, value } = e.target
    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'phone':
        setPhone(value)
        break
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
    const user = { firstName, lastName, phone, email, password }
    dispatch(registerThunk(user)).then(res => {
      if (res.error) {
        console.log('error', res.error)
      } else {
        reset()
        router.push('/')
      }
    })
  }

  const reset = () => {
    setFirstName('')
    setLastName('')
    setPhone('')
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <h2 className={s.title}>Реєстрація</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>Ім&#39;я</label>
        <input className={s.input} type="text" name="firstName" value={firstName} onChange={handleChange}></input>
        <label className={s.label}>Призвіще</label>
        <input className={s.input} type="text" name="lastName" value={lastName} onChange={handleChange}></input>
        <label className={s.label}>Телефон</label>
        <input className={s.input} type="text" name="phone" value={phone} onChange={handleChange}></input>
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
          Зареєструватися
        </button>
      </form>
    </>
  )
}

export default Register
