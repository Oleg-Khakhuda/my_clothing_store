import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_NEXT_API_URL

export const fetchCategoryThunk = createAsyncThunk('category/fetchCategory', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/categories/`)

    return data.categories
  } catch (error) {
    console.log(error)

    return rejectWithValue(error.message)
  }
})

export const fetchCategoryByMainSlugThunk = createAsyncThunk(
  'category/fetchCategoryByMainSlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/categories/slug/${slug}`)
      return data.result.items
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const addCategoryThunk = createAsyncThunk('category/addCategory', async (categoryData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/categories', categoryData)

    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateCategoryThunk = createAsyncThunk(
  'category/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/categories/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const removeCategoryThunk = createAsyncThunk('category/removeCategory', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/categories/delete/${id}`)

    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
