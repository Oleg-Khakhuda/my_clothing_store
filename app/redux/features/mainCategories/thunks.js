import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// const FETCH_GENDERCATEGORY = process.env.FETCH_GENDERCATEGORY;
// axios.defaults.baseURL = 'http://localhost:7000'

export const fetchMainCategoryThunk = createAsyncThunk(
  'mainCategory/fetchMainCategory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/mainCategories')
      return data.categories
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const addMainCategoryThunk = createAsyncThunk(
  'mainCategory/addMainCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:7000/api/gendercategories', formData, {
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

export const updateMainCategoryThunk = createAsyncThunk(
  'mainCategory/updateMainCategory',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`http://localhost:7000/api/gendercategories/update/${id}`, formData, {
        headers: {
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
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`http://localhost:7000/api/gendercategories/delete/${id}`)
      console.log(data)

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)
