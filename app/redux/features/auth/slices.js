import { createSlice } from '@reduxjs/toolkit'
import { registerThunk, loginThunk, currentThunk, logoutThunk } from './thunks'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { firstName: '', lastName: '', phone: '', email: '', role: '' },
    token: '',
    error: null,
    isLoading: false,
    isAuth: false,
  },

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        console.log(action.payload.data)

        state.isLoading = false
        state.user = action.payload.data
        state.token = action.payload.data.token
        state.isAuth = true
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(loginThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        state.token = action.payload.data.token
        state.isAuth = true
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.error
        state.isAuth = false
      })

      .addCase(currentThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(currentThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
      })
      .addCase(currentThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      .addCase(logoutThunk.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { firstName: '', lastName: '', phone: '', email: '', role: '' }
        state.token = ''
        state.isAuth = false
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
