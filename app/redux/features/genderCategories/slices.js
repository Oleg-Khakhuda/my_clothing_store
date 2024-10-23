import { createSlice } from "@reduxjs/toolkit";
import { fetchGenderCategoryThunk } from "./thunks";

const genderCategorySlice = createSlice({
  name: "genderCategory",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenderCategoryThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGenderCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenderCategoryThunk.rejected, (state, action) => {
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

export const genderCategoryReducer = genderCategorySlice.reducer;
