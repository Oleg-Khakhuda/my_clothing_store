import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsThunk,
  fetchProductsByMainCatThunk,
  fetchProductsByCatThunk,
  fetchProductByIdThunk,
  addProductThunk,
} from "./thunks";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addProductThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

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

const productsByMainCatSlice = createSlice({
  name: "productsByMainCat",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByMainCatThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsByMainCatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsByMainCatThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const productsByCatSlice = createSlice({
  name: "productsByCat",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCatThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsByCatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsByCatThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const productByIdSlice = createSlice({
  name: "productById",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByIdThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const productsByMainCatReducer = productsByMainCatSlice.reducer;
export const productsByCatReducer = productsByCatSlice.reducer;
export const productByIdReducer = productByIdSlice.reducer;
export const productsAddReducer = productsSlice.reducer;
