import { createSlice } from '@reduxjs/toolkit'
import {
  fetchProductsThunk,
  fetchProductsByMainCatThunk,
  fetchProductsByCatThunk,
  fetchProductByIdThunk,
  addProductThunk,
  updateProductThunk,
  removeProductThunk,
  removeProductImageThunk,
} from './thunks'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    message: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.error = action.payload.message
        state.isLoading = false
      })

      .addCase(addProductThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.items = [action.payload.result, ...state.items]
        state.message = action.payload.message
        state.isLoading = false
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.error = action.payload.message
        state.isLoading = false
      })

      .addCase(updateProductThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.items = state.items.map(el =>
          el.id === action.payload.updateProduct.id ? action.payload.updateProduct : el,
        )
        state.message = action.payload.message
        state.isLoading = false
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.error = action.payload.message
        state.isLoading = false
      })

      .addCase(removeProductThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(removeProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(el => el.id !== action.payload.product.id)
        state.message = action.payload.message
        state.isLoading = false
      })
      .addCase(removeProductThunk.rejected, (state, action) => {
        state.error = action.payload.message
        state.isLoading = false
      })

      .addCase(removeProductImageThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(removeProductImageThunk.fulfilled, (state, action) => {
        state.items = state.items.map(el =>
          el.id === action.payload.updateProduct.id ? action.payload.updateProduct : el,
        )
        state.message = action.payload.message

        state.isLoading = false
      })
      .addCase(removeProductImageThunk.rejected, (state, action) => {
        state.error = action.payload.message
        state.isLoading = false
      })
  },
})

const productsByMainCatSlice = createSlice({
  name: 'productsByMainCat',
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByMainCatThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductsByMainCatThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProductsByMainCatThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

const productsByCatSlice = createSlice({
  name: 'productsByCat',
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByCatThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductsByCatThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProductsByCatThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

const productByIdSlice = createSlice({
  name: 'productById',
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductByIdThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const productsReducer = productsSlice.reducer
export const productsByMainCatReducer = productsByMainCatSlice.reducer
export const productsByCatReducer = productsByCatSlice.reducer
export const productByIdReducer = productByIdSlice.reducer
