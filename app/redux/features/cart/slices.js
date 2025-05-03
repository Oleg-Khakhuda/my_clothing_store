import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId && item.size === action.payload.size,
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload.productId)
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload.productId)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: state => {
      state.items = []
    },
    incrementQuantity: (state, action) => {
      if (action.payload.quantity >= 10) {
        return
      }
      const item = state.items.find(
        item => item.productId === action.payload.productId && item.size === action.payload.size,
      )
      if (item) {
        item.quantity += 1
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(
        item => item.productId === action.payload.productId && item.size === action.payload.size,
      )
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else if (item) {
        state.items = state.items.filter(item => item.size !== action.payload.size)
      }
    },
    setQuantity: (state, action) => {
      console.log('action.payload', action.payload)

      const item = state.items.find(item => item.productId === action.payload.productId)
      if (item) {
        item.quantity = action.payload.newQuantity
      }
    },
  },
})

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, setQuantity } =
  cartSlice.actions
export const cartReducer = cartSlice.reducer
