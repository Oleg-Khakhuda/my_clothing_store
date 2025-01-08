import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_CATEGORY = process.env.FETCH_CATEGORY;
// axios.defaults.baseURL = process.env.NEXT_API_URL;

export const fetchCategoryThunk = createAsyncThunk(
  "category/fetchCategory",
  async (slug, { rejectWithValue }) => {
    try {
      // console.log("slug", slug);

      const { data } = await axios.get(`/api/categories/${slug}`);
      // console.log(data);

      return data.result.items;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
