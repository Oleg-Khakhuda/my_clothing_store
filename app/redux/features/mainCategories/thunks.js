import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const FETCH_GENDERCATEGORY = process.env.FETCH_GENDERCATEGORY;
axios.defaults.baseURL = process.env.DEV_NEXT_API_URL;

export const fetchMainCategoryThunk = createAsyncThunk(
  "mainCategory/fetchMainCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/mainCategories");
      return data.categories;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
