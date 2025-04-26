import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = process.env.DEV_NEXT_API_URL

const NEXT_API_URL = 'http://localhost:7000'

// const FETCH_PRODUCTS = process.env.FETCH_PRODUCTS
// const FETCH_PRODUCTS_BY_MAINCAT = process.env.FETCH_PRODUCTS_BY_MAINCAT
// const FETCH_PRODUCT_BY_ID = process.env.FETCH_PRODUCT_BY_ID
// const ADD_PRODUCT = process.env.ADD_PRODUCT

export const fetchProductsThunk = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/products/get_allproducts')

    return data.products.data
  } catch (error) {
    console.log(error)

    return rejectWithValue(error.message)
  }
})

export const fetchProductsByMainCatThunk = createAsyncThunk(
  'products/fetchProductsByMainCat',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios(`/api/products/get_products/${slug}`)

      return data.data.products
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const fetchProductsByCatThunk = createAsyncThunk(
  'products/fetchProductsByCat',
  async (categorySlug, { rejectWithValue }) => {
    try {
      const { data } = await axios(`/api/products/get_products/cat/${categorySlug}`)

      return data.data.products
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const fetchProductByIdThunk = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/product/${productId}`)

      return data.product
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)

export const addProductThunk = createAsyncThunk('products/addProduct', async (formData, { rejectWithValue }) => {
  try {
    // const { data } = await axios.post(
    //   '/api/products/add_product/',
    //   formData,
    const { data } = await axios.post('http://localhost:7000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(data)

    return data.result
  } catch (error) {
    console.log(error)

    return rejectWithValue(error.message)
  }
})

export const updateProductThunk = createAsyncThunk('products/updateProduct', async (prop, { rejectWithValue }) => {
  try {
    // const { data } = await axios.post(
    //   '/api/products/add_product/',
    //   formData,
    const { data } = await axios.put(`http://localhost:7000/api/products/update/${prop.id}`, prop.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  } catch (error) {
    console.log(error)

    return rejectWithValue(error.message)
  }
})

export const removeProductThunk = createAsyncThunk('products/removeProduct', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/products/delete_product/${productId}`)
    console.log(data)

    return data
  } catch (error) {
    console.log(error)

    return rejectWithValue(error.message)
  }
})

export const removeProductImageThunk = createAsyncThunk(
  'products/removeProductImage',
  async (props, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${NEXT_API_URL}/api/products/deleteImage/${props.id}?public_id=${props.idFileCloud}`,
      )
      console.log(data)

      return data
    } catch (error) {
      console.log(error)

      return rejectWithValue(error.message)
    }
  },
)
