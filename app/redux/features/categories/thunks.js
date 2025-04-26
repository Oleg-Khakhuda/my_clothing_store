import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const FETCH_CATEGORY = process.env.FETCH_CATEGORY
// axios.defaults.baseURL = process.env.NEXT_API_URL;

export const fetchCategoryThunk = createAsyncThunk('category/fetchCategory', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:7000/api/categories/`)

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
      const { data } = await axios.get(`/api/categories/${slug}`)

      return data.result.items
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const addCategoryThunk = createAsyncThunk('category/addCategory', async (categoryData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:7000/api/categories', categoryData)

    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateCategoryThunk = createAsyncThunk(
  'category/updateCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`http://localhost:7000/api/categories/update/${id}`, formData, {
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
    const { data } = await axios.delete(`http://localhost:7000/api/categories/delete/${id}`)

    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
