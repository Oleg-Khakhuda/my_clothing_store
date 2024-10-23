import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_PRODUCTS = process.env.FETCH_PRODUCTS;
axios.defaults.baseURL = process.env.NEXT_API_URL;

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios(FETCH_PRODUCTS);

      return data.products.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
