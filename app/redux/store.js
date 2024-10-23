import { configureStore } from "@reduxjs/toolkit";
import { genderCategoryReducer } from "./features/genderCategories/slices";
import { ProductsReducer } from "./features/products/slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      genderCategory: genderCategoryReducer,
      products: ProductsReducer,
    },
  });
};
