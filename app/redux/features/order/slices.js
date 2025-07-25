import { createSlice } from '@reduxjs/toolkit'
import { fetchAllOrderThunk, fetchOrderByUserThunk, createOrderThunk } from './thunks'

const orderAllSlice = createSlice({
  name: 'allOrder',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllOrderThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.orders
      })
      .addCase(fetchAllOrderThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message
      })

      .addCase(createOrderThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = [action.payload.order, ...state.items]
        state.message = action.payload.message
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message
      })
  },
})

const orderByUserSlice = createSlice({
  name: 'orderByUser',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderByUserThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchOrderByUserThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.orders
      })
      .addCase(fetchOrderByUserThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message
      })
  },
})

export const orderAllReducer = orderAllSlice.reducer
export const orderByUserReducer = orderByUserSlice.reducer
