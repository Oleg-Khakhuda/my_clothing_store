import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_GENDERCATEGORY = process.env.FETCH_GENDERCATEGORY;
axios.defaults.baseURL = process.env.NEXT_API_URL;

export const fetchGenderCategoryThunk = createAsyncThunk(
  "genderCategory/fetchGenderCategory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios(FETCH_GENDERCATEGORY);
      return data.categories;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
