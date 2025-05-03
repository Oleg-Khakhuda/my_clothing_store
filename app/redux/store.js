import { configureStore } from '@reduxjs/toolkit'
import { mainCategoryReducer } from './features/mainCategories/slices'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './features/auth/slices'
import { cartReducer } from './features/cart/slices'
import {
  productsByMainCatReducer,
  productsByCatReducer,
  productsReducer,
  productByIdReducer,
} from './features/products/slices'
import { categoryReducer, categoryByMainSlugReducer } from './features/categories/slices'

const authPersistConfig = {
  key: 'authToken',
  storage,
  whiteList: ['token'],
  blacklist: ['error'],
}

const authPersistReducer = persistReducer(authPersistConfig, authReducer)

const cartPersistConfig = {
  key: 'cart',
  storage,
  whiteList: ['price', 'color', 'size', 'image', 'name', 'article', 'productId'],
}
const cartPersistReducer = persistReducer(cartPersistConfig, cartReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authPersistReducer,
      mainCategory: mainCategoryReducer,
      category: categoryReducer,
      categoryByMainSlug: categoryByMainSlugReducer,
      products: productsReducer,
      productsByMainCat: productsByMainCatReducer,
      productsByCat: productsByCatReducer,
      productById: productByIdReducer,
      cart: cartPersistReducer,
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
