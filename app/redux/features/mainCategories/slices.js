import { createSlice } from '@reduxjs/toolkit'
import {
  fetchMainCategoryThunk,
  addMainCategoryThunk,
  updateMainCategoryThunk,
  removeMainCategoryThunk,
} from './thunks'

const mainCategorySlice = createSlice({
  name: 'mainCategory',
  initialState: {
    items: [],
    error: null,
    message: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMainCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchMainCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false

        state.items = action.payload
      })
      .addCase(fetchMainCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(addMainCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addMainCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = [...state.items, ...action.payload.result]

        state.message = action.payload.message
      })
      .addCase(addMainCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(updateMainCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateMainCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.map(item =>
          item.id === action.payload.updateCategory.id ? action.payload.updateCategory : item,
        )

        state.message = action.payload.message
      })
      .addCase(updateMainCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })

      .addCase(removeMainCategoryThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(removeMainCategoryThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(el => el.id !== action.payload.category.id)
        state.isLoading = false

        state.message = action.payload.message
      })
      .addCase(removeMainCategoryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message
      })
  },
})

export const mainCategoryReducer = mainCategorySlice.reducer
