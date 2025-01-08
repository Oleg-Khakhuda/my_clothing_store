import { configureStore } from "@reduxjs/toolkit";
import { mainCategoryReducer } from "./features/mainCategories/slices";
import {
  productsByMainCatReducer,
  productsByCatReducer,
  productsReducer,
  productByIdReducer,
  productsAddReducer,
} from "./features/products/slices";
import { categoryReducer } from "./features/categories/slices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      mainCategory: mainCategoryReducer,
      category: categoryReducer,
      products: productsReducer,
      productsByMainCat: productsByMainCatReducer,
      productsByCat: productsByCatReducer,
      productById: productByIdReducer,
      addProduct: productsAddReducer,
    },
  });
};
