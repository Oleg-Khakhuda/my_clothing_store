import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_NEXT_API_URL

export const fetchMainCategoryThunk = createAsyncThunk(
  'mainCategory/fetchMainCategory',
  async (_, { rejectWithValue }) => {
    try {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_NEXT_API_URL
      const { data } = await axios.get('api/gendercategories')

      return data.categories
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const addMainCategoryThunk = createAsyncThunk(
  'mainCategory/addMainCategory',
  async (formData, { rejectWithValue, getState }) => {
    const state = getState()
    const token = state.auth.token

    try {
      const { data } = await axios.post('/api/gendercategories/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateMainCategoryThunk = createAsyncThunk(
  'mainCategory/updateMainCategory',
  async ({ id, formData }, { rejectWithValue, getState }) => {
    const state = getState()
    const token = state.auth.token
    console.log('token', token)

    try {
      const { data } = await axios.put(`/api/gendercategories/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data)

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const removeMainCategoryThunk = createAsyncThunk(
  'mainCategory/removeMainCategory',
  async (id, { rejectWithValue, getState }) => {
    const state = getState()
    const token = state.auth.token

    try {
      const { data } = await axios.delete(`/api/gendercategories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(data)

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)
