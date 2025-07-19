import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerThunk = createAsyncThunk('user/register', async (user, { rejectWithValue }) => {
  try {
    const data = await axios.post(`http://localhost:7000/api/auth/signup`, user)
    // console.log(data)

    return data.data
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})

export const loginThunk = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
  try {
    const data = await axios.post(`http://localhost:7000/api/auth/login`, user)
    // console.log(data.data)
    return data.data
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message })
  }
})

export const currentThunk = createAsyncThunk('user/current', async (token, { rejectWithValue }) => {
  if (!token) return

  try {
    const data = await axios.get(`http://localhost:7000/api/auth/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // console.log(data.data)

    return data.data
  } catch (error) {
    rejectWithValue({ error: error.message })
  }
})

export const logoutThunk = createAsyncThunk('user/logout', async (_, { rejectWithValue, getState }) => {
  const state = getState()
  const token = state.auth.token

  try {
    const data = await axios.post(`http://localhost:7000/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // console.log(data)

    return data.data
  } catch (error) {
    rejectWithValue({ error: error.message })
  }
})
