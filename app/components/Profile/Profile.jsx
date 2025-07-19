'use client'

import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks'
import { currentThunk } from '@/app/redux/features/auth/thunks'
import { useRouter } from 'next/router'

const Profile = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  console.log('user', user)

  useEffect(() => {
    if (!user?.name) {
      dispatch(currentThunk()).then(res => {
        console.log('res', res)
        if (res.payload === undefined) {
          router.push('/login')
        }
      })
    }
  }, [dispatch, router, user])

  return <div>Profile</div>
}

export default Profile
