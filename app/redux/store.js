import { configureStore } from '@reduxjs/toolkit'
import { mainCategoryReducer } from './features/mainCategories/slices'
import {
  productsByMainCatReducer,
  productsByCatReducer,
  productsReducer,
  productByIdReducer,
} from './features/products/slices'
import { categoryReducer, categoryByMainSlugReducer } from './features/categories/slices'

export const makeStore = () => {
  return configureStore({
    reducer: {
      mainCategory: mainCategoryReducer,
      category: categoryReducer,
      categoryByMainSlug: categoryByMainSlugReducer,
      products: productsReducer,
      productsByMainCat: productsByMainCatReducer,
      productsByCat: productsByCatReducer,
      productById: productByIdReducer,
    },
  })
}
