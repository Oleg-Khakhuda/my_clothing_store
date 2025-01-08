import { createSlice } from "@reduxjs/toolkit";
import { fetchMainCategoryThunk } from "./thunks";

const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCategoryThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchMainCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMainCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //   .addCase(addMainCategoryThunk.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(addMainCategoryThunk.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.title = action.payload.title;
    //     state.image = action.payload.image;
    //   })
    //   .addCase(addMainCategoryThunk.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });

    // .addCase(deleteMainCategoryThunk.pending, (state, action) => {
    //   state.isLoading = true;
    // })
    // .addCase(deleteMainCategoryThunk.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.title = action.payload.title;
    //   state.image = action.payload.image;
    // })
    // .addCase(deleteMainCategoryThunk.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const mainCategoryReducer = mainCategorySlice.reducer;
