import { configureStore } from '@reduxjs/toolkit'
import { mainCategoryReducer } from './features/mainCategories/slices'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cartReducer } from './features/cart/slices'
import {
  productsByMainCatReducer,
  productsByCatReducer,
  productsReducer,
  productByIdReducer,
} from './features/products/slices'
import { categoryReducer, categoryByMainSlugReducer } from './features/categories/slices'

const persistConfig = {
  key: 'cart',
  storage,
  whiteList: ['price', 'color', 'size', 'image', 'name', 'article', 'productId'],
}
const persistedCartReducer = persistReducer(persistConfig, cartReducer)

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
      cart: persistedCartReducer,
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

export const persistor = persistStore(makeStore())
