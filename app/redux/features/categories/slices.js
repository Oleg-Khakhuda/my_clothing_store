import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryThunk } from "./thunks";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
