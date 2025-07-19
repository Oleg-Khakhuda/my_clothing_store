import { createSlice } from '@reduxjs/toolkit'
import {
  fetchCategoryThunk,
  fetchCategoryByMainSlugThunk,
  updateCategoryThunk,
  addCategoryThunk,
  removeCategoryThunk,
} from './thunks'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    error: null,
    message: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(updateCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.map(item =>
          item.id === action.payload.updateCategory.id ? action.payload.updateCategory : item,
        )
        state.message = action.payload.message
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(addCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = [...state.items, ...action.payload.result]
        state.message = action.payload.message
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(removeCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(removeCategoryThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(el => el.id !== action.payload.category.id)
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(removeCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
  },
})

const categoryByMainSlugSlice = createSlice({
  name: 'categoryByMainSlug',
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryByMainSlugThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchCategoryByMainSlugThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchCategoryByMainSlugThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const categoryReducer = categorySlice.reducer
export const categoryByMainSlugReducer = categoryByMainSlugSlice.reducer
